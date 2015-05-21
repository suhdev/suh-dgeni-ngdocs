var path = require('canonical-path');
var packagePath = __dirname;
var Package = require('dgeni').Package;

// Create and export a new Dgeni package called dgeni-example. This package depends upon
// the jsdoc and nunjucks packages defined in the dgeni-packages npm module.
module.exports = function(conf){
  return new Package('suh-docs', [
    require('dgeni-packages/ngdoc'),
    require('dgeni-packages/nunjucks')
  ])

  .factory(require('./src/services/errorNamespaceMap'))
  .factory(require('./src/services/getMinerrInfo'))
  .factory(require('./src/services/getVersion'))
  .factory(require('./src/services/gitData'))

  .factory(require('./src/services/deployments/debug'))
  .factory(require('./src/services/deployments/default'))
  .factory(require('./src/services/deployments/jquery'))
  .factory(require('./src/services/deployments/production'))

  .factory(require('./src/inline-tag-defs/type'))


  .processor(require('./src/processors/error-docs'))
  .processor(require('./src/processors/index-page'))
  .processor(require('./src/processors/keywords'))
  .processor(require('./src/processors/pages-data'))
  .processor(require('./src/processors/versions-data'))


  .config(function(dgeni, log, readFilesProcessor, writeFilesProcessor) {

    dgeni.stopOnValidationError = true;
    dgeni.stopOnProcessingError = true;

    log.level = 'info';

    readFilesProcessor.basePath = conf.basePath; //path.resolve(__dirname,'./');
    readFilesProcessor.sourceFiles = conf.sourceFiles; 
    // readFilesProcessor.sourceFiles = [
    //   { include: 'src/**/*.js', basePath: 'src' },
    //   { include: 'docs/content/**/*.ngdoc', basePath: 'docs/content' }
    // ];

    writeFilesProcessor.outputFolder = conf.outputFolder;//'build/docs';

  })


  .config(function(parseTagsProcessor) {
    parseTagsProcessor.tagDefinitions.push(require('./src/tag-defs/tutorial-step'));
    parseTagsProcessor.tagDefinitions.push(require('./src/tag-defs/sortOrder'));
  })


  .config(function(inlineTagProcessor, typeInlineTagDef) {
    inlineTagProcessor.inlineTagDefinitions.push(typeInlineTagDef);
  })


  .config(function(templateFinder, renderDocsProcessor, gitData) {
    templateFinder.templateFolders.unshift(path.resolve(packagePath, 'templates'));
    renderDocsProcessor.extraData.git = gitData;
  })


  .config(function(computePathsProcessor, computeIdsProcessor) {

    computePathsProcessor.pathTemplates.push({
      docTypes: ['error'],
      pathTemplate: 'error/${namespace}/${name}',
      outputPathTemplate: 'partials/error/${namespace}/${name}.html'
    });

    computePathsProcessor.pathTemplates.push({
      docTypes: ['errorNamespace'],
      pathTemplate: 'error/${name}',
      outputPathTemplate: 'partials/error/${name}.html'
    });

    computePathsProcessor.pathTemplates.push({
      docTypes: ['overview', 'tutorial'],
      getPath: function(doc) {
        var docPath = path.dirname(doc.fileInfo.relativePath);
        if ( doc.fileInfo.baseName !== 'index' ) {
          docPath = path.join(docPath, doc.fileInfo.baseName);
        }
        return docPath;
      },
      outputPathTemplate: 'partials/${path}.html'
    });

    computePathsProcessor.pathTemplates.push({
      docTypes: ['e2e-test'],
      getPath: function() {},
      outputPathTemplate: 'ptore2e/${example.id}/${deployment.name}_test.js'
    });

    computePathsProcessor.pathTemplates.push({
      docTypes: ['indexPage'],
      pathTemplate: '.',
      outputPathTemplate: '${id}.html'
    });

    computePathsProcessor.pathTemplates.push({
      docTypes: ['module' ],
      pathTemplate: '${area}/${name}',
      outputPathTemplate: 'partials/${area}/${name}.html'
    });
    computePathsProcessor.pathTemplates.push({
      docTypes: ['componentGroup' ],
      pathTemplate: '${area}/${moduleName}/${groupType}',
      outputPathTemplate: 'partials/${area}/${moduleName}/${groupType}.html'
    });

    computeIdsProcessor.idTemplates.push({
      docTypes: ['overview', 'tutorial', 'e2e-test', 'indexPage'],
      getId: function(doc) { return doc.fileInfo.baseName; },
      getAliases: function(doc) { return [doc.id]; }
    });

    computeIdsProcessor.idTemplates.push({
      docTypes: ['error'],
      getId: function(doc) { return 'error:' + doc.namespace + ':' + doc.name; },
      getAliases: function(doc) { return [doc.name, doc.namespace + ':' + doc.name, doc.id]; }
    },
    {
      docTypes: ['errorNamespace'],
      getId: function(doc) { return 'error:' + doc.name; },
      getAliases: function(doc) { return [doc.id]; }
    }
    );
  })

  .config(function(checkAnchorLinksProcessor) {
    checkAnchorLinksProcessor.base = '/';
    // We are only interested in docs that have an area (i.e. they are pages)
    checkAnchorLinksProcessor.checkDoc = function(doc) { return doc.area; };
  })


    //generateProtractorTestsProcessor,
    // generateExamplesProcessor,
  .config(function(
    generateIndexPagesProcessor,
    debugDeployment, defaultDeployment,
    jqueryDeployment, productionDeployment) {

    generateIndexPagesProcessor.deployments = [
      debugDeployment,
      defaultDeployment,
      jqueryDeployment,
      productionDeployment
    ];

    // generateProtractorTestsProcessor.deployments = [
    //   defaultDeployment,
    //   jqueryDeployment
    // ];

    // generateProtractorTestsProcessor.basePath = 'build/docs/';

    // generateExamplesProcessor.deployments = [
    //   debugDeployment,
    //   defaultDeployment,
    //   jqueryDeployment,
    //   productionDeployment
    // ];
  });
};