pipeline {
  agent any
  stages {
    stage('Build') {
      stage('Build Project') {
        steps {
          echo 'Installing Packages..'
          bat 'npm install'
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