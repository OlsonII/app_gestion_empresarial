pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Installing Packages..'
        bat 'npm install'
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