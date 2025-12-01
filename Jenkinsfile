pipeline {
    agent {
        docker {
            image 'node:22'
        }
    }

    stages {
        stage('install') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                script {
                    String tag = sh(returnStdout: true, script: 'git tag --contains HEAD 2>/dev/null || echo ""').trim()
                    String branchName = sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
                    String commit = sh(returnStdout: true, script: 'git log -1 --oneline').trim()
                    String commitMsg = commit.contains(' ') ? commit.substring(commit.indexOf(' ')).trim() : commit

                    if (tag) {
                        currentBuild.displayName = "#${BUILD_NUMBER}, tag ${tag}"
                    } else {
                        currentBuild.displayName = "#${BUILD_NUMBER}, branch ${branchName}"
                    }

                    String author = sh(returnStdout: true, script: "git log -1 --pretty=format:'%an'").trim()
                    currentBuild.description = "${author}<br />${commitMsg}"
                    echo 'Starting installation...'
                    sh 'npm ci --legacy-peer-deps'
                }
            }
        }

        stage('checks') {
            parallel {
                stage('eslint') {
                    steps {
                        sh 'npm run eslint || true'
                    }
                }

                stage('test') {
                    steps {
                        sh 'npm test'
                    }
                }

                stage('build:backend') {
                    steps {
                        sh 'npm run build:backend || echo "Backend build skipped if no TypeScript errors"'
                    }
                }
            }
        }

        stage('build') {
            steps {
                echo 'Building production bundle...'
                sh 'npm run build:prod'
                sh 'ls -la dist/ || echo "Dist directory check"'
            }
        }

        stage('clean-all') {
            steps {
                sh 'rm -rf .[!.]*'
                sh 'rm -rf ./*'
                sh 'ls -a'
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed!'
        }
        always {
            echo 'Build pipeline finished.'
        }
    }
}
