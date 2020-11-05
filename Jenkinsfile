pipeline {
  agent any
  stages {
    stage('Build') {
      parallel {
        stage('Build Backend') {
          steps {
            echo 'Building Backend..'
            bat 'npm install'
          }
        }

        stage('Build FrontEnd') {
          steps {
            echo 'Building front...'
            bat 'cd src/presentation/ & npm install'
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