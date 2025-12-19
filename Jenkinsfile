pipeline {
    agent any

    stages {
        stage('Health check') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Verify files') {
            steps {
                sh 'test -f proximity.css || exit 1'
                sh 'test -f proximity.js || exit 1'
                sh 'test -d docs || exit 1'
                echo 'All required files present'
            }
        }

        stage('Prepare deployment') {
            steps {
                // Create deployment directory with correct structure for proximityui.com
                sh 'rm -rf deploy'
                sh 'mkdir -p deploy/components'

                // Copy CSS and JS to root
                sh 'cp proximity.css deploy/'
                sh 'cp proximity.js deploy/'

                // Copy and fix paths in index.html: ../proximity.css -> proximity.css
                sh 'sed "s|../proximity.css|proximity.css|g; s|../proximity.js|proximity.js|g" docs/index.html > deploy/index.html'

                // Copy and fix paths in component pages: ../../proximity.css -> ../proximity.css
                sh '''
                    for file in docs/components/*.html; do
                        filename=$(basename "$file")
                        sed "s|../../proximity.css|../proximity.css|g; s|../../proximity.js|../proximity.js|g" "$file" > "deploy/components/$filename"
                    done
                '''

                echo 'Deployment directory prepared with corrected paths'
                sh 'ls -la deploy/'
                sh 'ls -la deploy/components/'
            }
        }

        stage('Deploy to Nginx') {
            steps {
                // Deploy the prepared directory
                sh 'sudo /usr/local/bin/deploy_blog.sh proximityui deploy'
            }
        }

        stage('Archive site') {
            steps {
                archiveArtifacts artifacts: '**/*.css, **/*.js, docs/**/*.html, examples/**/*.py, CHANGELOG.md, README.md', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '✅ Deployment completed successfully'
        }
        failure {
            echo '❌ Deployment failed'
        }
    }
}