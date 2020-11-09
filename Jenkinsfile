pipeline {
  agent any
  stages {
    stage('Installing') {
      steps {
        echo 'Installing Packages..'
        bat 'npm install'
      }
    }

    stage('Building'){
        steps{
            echo 'Building projects...'
            bat 'npm run build'
        }
    }

    stage('Testing') {
      steps {
        echo 'Testing...'
        bat 'npm run test'
      }
    }

    stage('Deploying'){
      steps{
        echo 'Deploying...'
        bat 'firebase deploy --token 1//05xe9JAHmVHBwCgYIARAAGAUSNwF-L9IrvM1yBolgfpYF5MRFEvEmcZncEUXjM0L304hpSJC4-maF6-L3x0RmjA3SmHGzuH0_T2s'
      }
    }

  }
}