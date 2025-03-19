#!groovy

ies_build {
  cleanWs()
  withAWS(credentials:'AWS KEY', region: 'us-east-1') {
    stage(name: 'Checkout') {
      checkout scm
    }

    def shortName = "ui_template"
    def appName = "ui_template"

    def gitCommit = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()

    def shouldRelease = false
    if (env.BRANCH_NAME == 'master') { shouldRelease = true }

    lock(shortName) {
      samCli = docker.image("public.ecr.aws/sam/build-nodejs18.x")
      samCli.pull()
      def login = ecrLogin()
      sh login
      cdkImage = docker.image("738151687693.dkr.ecr.us-east-1.amazonaws.com/ies-cdk-runner:3.12-bookworm-20240531")
      cdkImage.pull()

      stage("Build") {
        parallel "Web App": {
          // might as well use the SAM docker image; it's got NPM after all.
          samCli.inside("-v ${env.WORKSPACE}:/code -w /code --entrypoint='' -e 'HOME=/var/tmp'") {
            npm_login() // also does npm ci

            if (currentBuild.resultIsBetterOrEqualTo('SUCCESS')) {
              stage(name: "Packaging") {
                try {
                  // sh "npm run build"

                  script {
                    sh "npm run build"
                    sh "tar -z -c -f ${shortName}.tgz -C dist/ ." // package up the app.
                  }

                  // archiveArtifacts artifacts: "${shortName}.tgz" // Not quite sure if this is still working.

                } catch (Exception e) {
                  echo "Stage failed, but continuing: ${e}"
                }
              }
            }
          }
        }
      }

      if (currentBuild.resultIsBetterOrEqualTo('SUCCESS') == false) { return; }
      
      if (shouldRelease == false) { return; }

      stage("UAT Deployment") {
        archiveToS3('*.tgz') // Only archive to S3 for master branch.
      }

    } // lock
  } // with-aws
} // ies-build