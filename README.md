<div align="center">

# 🛠️ BuildMyOwnGit

_Learn Git Internals by Building Your Own Git from Scratch_

![last-commit](https://img.shields.io/github/last-commit/Sarangkale66/BuildMyOwnGit?style=flat&logo=git&logoColor=white&color=blue)
![repo-top-language](https://img.shields.io/github/languages/top/Sarangkale66/BuildMyOwnGit?style=flat&color=blue)
![repo-language-count](https://img.shields.io/github/languages/count/Sarangkale66/BuildMyOwnGit?style=flat&color=blue)

</div>

---

## 📦 Built With

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=flat&logo=bun&logoColor=white)
![zlib](https://img.shields.io/badge/zlib-compression-ff69b4?style=flat)
![Git](https://img.shields.io/badge/Git-000000?style=flat&logo=git&logoColor=white)
![Shell Script](https://img.shields.io/badge/Shell-121011?style=flat&logo=gnu-bash&logoColor=white)

---

## 📌 Overview

**BuildMyOwnGit** is a personal learning project inspired by [CodeCrafters Git Challenge](https://codecrafters.io). It mimics Git’s internals by implementing core commands like initializing a repo, hashing objects, and reading back data—all without using the Git CLI.

---

## 🧰 Commands Implemented

✅ `git init` – Initializes a `.git/` directory  
✅ `git hash-object -w <file>` – Hashes and stores the file content as a blob  
✅ `git cat-file -p <hash>` – Reads and decompresses Git object contents

More commands coming soon!

---

## 📁 Table of Contents

- [Overview](#overview)
- [Commands Implemented](#-commands-implemented)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Learnings](#-learnings)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Getting Started

### 🔧 Prerequisites

- TypeScript / JavaScript knowledge
- [Bun](https://bun.sh/docs/installation) installed globally
- Familiarity with Git concepts

---

### 📦 Installation

```sh
# Clone the repository
git clone https://github.com/Sarangkale66/BuildMyOwnGit
cd git-cli

# Install dependencies
bun install
