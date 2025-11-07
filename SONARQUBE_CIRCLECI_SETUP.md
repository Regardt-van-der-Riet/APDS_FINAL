# SonarQube and CircleCI Setup Guide

This guide will help you set up SonarQube code analysis with CircleCI for your APDS Final Project.

## Prerequisites

- GitHub repository with code pushed (✅ Already done)
- GitHub account
- CircleCI account
- SonarCloud account (free for open-source projects)

---

## Part 1: SonarCloud Setup

### Step 1: Create SonarCloud Account

1. Go to [SonarCloud.io](https://sonarcloud.io/)
2. Click **"Log in"** and select **"With GitHub"**
3. Authorize SonarCloud to access your GitHub account
4. Click **"Analyze new project"**

### Step 2: Import Your GitHub Repository

1. Click on the **"+"** icon in the top right
2. Select **"Analyze new project"**
3. Choose your organization or create a new one:
   - Organization name: `regardt-van-der-riet` (or your preferred name)
   - Choose your GitHub organization
4. Select your repository: **APDS_FINAL**
5. Click **"Set Up"**

### Step 3: Get Your SonarCloud Token

1. Click on your profile icon (top right)
2. Go to **My Account** → **Security**
3. Under **"Generate Tokens"**:
   - Name: `CircleCI-APDS-FINAL`
   - Type: Choose **"User Token"** or **"Project Analysis Token"**
   - Click **"Generate"**
4. **IMPORTANT**: Copy this token immediately and save it securely. You won't see it again!

### Step 4: Note Your Project Details

You'll need these values for CircleCI:
- **Organization Key**: Found in your SonarCloud organization settings (e.g., `regardt-van-der-riet`)
- **Project Key**: Usually your repository name (e.g., `APDS_FINAL` or `regardt-van-der-riet_APDS_FINAL`)
- **Token**: The token you just generated

---

## Part 2: CircleCI Setup

### Step 1: Create CircleCI Account

1. Go to [CircleCI.com](https://circleci.com/)
2. Click **"Sign Up"** and select **"Sign Up with GitHub"**
3. Authorize CircleCI to access your GitHub account

### Step 2: Set Up Your Project

1. On the CircleCI dashboard, click **"Projects"** in the left sidebar
2. Find **"APDS_FINAL"** in your repository list
3. Click **"Set Up Project"**
4. CircleCI will detect your `.circleci/config.yml` file
5. Click **"Use Existing Config"** (since we already have the config file)
6. Click **"Start Building"**

### Step 3: Add Environment Variables

This is crucial for SonarQube to work:

1. In CircleCI, go to your project: **APDS_FINAL**
2. Click the **"Project Settings"** button (gear icon)
3. In the left sidebar, click **"Environment Variables"**
4. Add the following three variables by clicking **"Add Environment Variable"**:

   **Variable 1:**
   - Name: `SONAR_TOKEN`
   - Value: [Paste your SonarCloud token from Step 3 above]

   **Variable 2:**
   - Name: `SONAR_PROJECT_KEY`
   - Value: `APDS_FINAL` (or the exact project key from SonarCloud)

   **Variable 3:**
   - Name: `SONAR_ORGANIZATION`
   - Value: `regardt-van-der-riet` (or your SonarCloud organization key)

5. Click **"Add Environment Variable"** for each one

---

## Part 3: Update SonarCloud Project Configuration

### Option A: Manual Configuration in SonarCloud

1. Go to your project in SonarCloud
2. Click **"Administration"** → **"General Settings"**
3. Under **"Project Key"**, ensure it matches what you set in CircleCI
4. Go to **"Analysis Scope"**:
   - Add exclusions: `**/node_modules/**`, `**/build/**`, `**/coverage/**`

### Option B: Use the sonar-project.properties File

The `sonar-project.properties` file has been created in your project root. Update these values if needed:

```properties
sonar.projectKey=APDS_FINAL
sonar.organization=regardt-van-der-riet
```

Make sure these match your SonarCloud settings exactly!

---

## Part 4: Testing the Setup

### Step 1: Commit and Push the Configuration Files

```bash
git add sonar-project.properties .circleci/config.yml
git commit -m "Add SonarQube integration with CircleCI"
git push origin main
```

### Step 2: Verify CircleCI Pipeline

1. Go to your CircleCI dashboard
2. You should see a new pipeline running automatically
3. Click on the workflow to see all jobs
4. The **"code-quality"** job should:
   - Install dependencies
   - Download and install SonarScanner
   - Run SonarQube analysis
   - Complete successfully (green checkmark)

### Step 3: View SonarQube Results

1. Go to [SonarCloud.io](https://sonarcloud.io/)
2. Click on your **APDS_FINAL** project
3. You should see:
   - **Bugs**: Issues that could cause runtime errors
   - **Vulnerabilities**: Security issues
   - **Code Smells**: Maintainability issues
   - **Security Hotspots**: Security-sensitive code that needs review
   - **Coverage**: Test coverage percentage
   - **Duplications**: Duplicate code blocks

---

## Understanding SonarQube Results

### Security Hotspots
- Code that is security-sensitive and needs manual review
- Examples: password validation, encryption, authentication
- Found under **"Security Hotspots"** tab

### Code Smells
- Maintainability issues that make code harder to understand or modify
- Examples: complex functions, duplicate code, unused variables
- Found under **"Issues"** tab, filter by **"Code Smell"**

### Quality Gate
- Set of conditions your code must meet
- Default conditions:
  - No new bugs
  - No new vulnerabilities
  - Coverage on new code ≥ 80%
  - Duplicated lines on new code ≤ 3%

---

## Troubleshooting

### Issue: CircleCI Job Fails with "Authentication Error"

**Solution**: Double-check your `SONAR_TOKEN` environment variable in CircleCI

### Issue: Project Not Found

**Solution**: Verify that `SONAR_PROJECT_KEY` and `SONAR_ORGANIZATION` match exactly with SonarCloud

### Issue: No Analysis Results

**Solution**: 
1. Check that `sonar-project.properties` is in the repository root
2. Verify the `sonar.sources` path is correct
3. Check CircleCI logs for specific errors

### Issue: Quality Gate Fails

**Solution**: 
1. Review the specific conditions that failed
2. Fix the identified issues in your code
3. Push the changes to trigger a new analysis

---

## Viewing Reports

### CircleCI Dashboard
- URL: `https://app.circleci.com/pipelines/github/Regardt-van-der-Riet/APDS_FINAL`
- Shows pipeline execution status and logs

### SonarCloud Dashboard
- URL: `https://sonarcloud.io/dashboard?id=APDS_FINAL`
- Shows detailed code quality metrics, hotspots, and code smells

---

## Adding a Badge to Your README (Optional)

Add these badges to show your code quality status:

**CircleCI Badge:**
```markdown
[![CircleCI](https://circleci.com/gh/Regardt-van-der-Riet/APDS_FINAL.svg?style=svg)](https://circleci.com/gh/Regardt-van-der-Riet/APDS_FINAL)
```

**SonarCloud Badges:**
```markdown
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=APDS_FINAL&metric=alert_status)](https://sonarcloud.io/dashboard?id=APDS_FINAL)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=APDS_FINAL&metric=bugs)](https://sonarcloud.io/dashboard?id=APDS_FINAL)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=APDS_FINAL&metric=code_smells)](https://sonarcloud.io/dashboard?id=APDS_FINAL)
[![Security Hotspots](https://sonarcloud.io/api/project_badges/measure?project=APDS_FINAL&metric=security_hotspots)](https://sonarcloud.io/dashboard?id=APDS_FINAL)
```

---

## Next Steps

1. ✅ Review SonarQube findings
2. ✅ Fix critical bugs and vulnerabilities first
3. ✅ Address security hotspots
4. ✅ Refactor code smells for better maintainability
5. ✅ Monitor quality gate status on each commit

## Support

- **SonarCloud Docs**: https://docs.sonarcloud.io/
- **CircleCI Docs**: https://circleci.com/docs/
- **SonarCloud Community**: https://community.sonarsource.com/

---

## Summary

You now have:
- ✅ Automated code quality scanning
- ✅ Security hotspot detection
- ✅ Code smell identification
- ✅ CI/CD pipeline with SonarQube integration
- ✅ Quality gate enforcement

Every push to your repository will trigger:
1. CircleCI pipeline execution
2. SonarQube code analysis
3. Security and quality checks
4. Detailed reports in SonarCloud dashboard

