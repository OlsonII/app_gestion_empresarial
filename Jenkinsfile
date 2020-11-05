pipeline {
  agent any
  stages {
    stage('Build') {
      parallel {
        stage('Build Front') {
          steps {
            echo 'Building Backend..'
            bat 'npm install'
          }
        }

        stage('Build Back') {
          steps {
            echo 'Building front...'
            bat 'cd src/presentation/'
            bat 'npm install'
          }
        }

      }
    }

    stage('Test') {
      steps {
        echo 'Testing..'
        bat 'npm run test'
      }
    }

  }
}