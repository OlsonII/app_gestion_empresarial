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
        bat 'firebase deploy --token 05G-ApKix3SioCgYIARAAGAUSNwF-L9IrNyffedMP276EBBnMTtLT-sG1W5goJordf1wg8l1kya2ZoBFwvciX-jiyExSc9UOFzk8'
      }
    }

  }
}