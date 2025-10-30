# File Manager

A simple CLI-based file manager built with pure Node.js (ESM, async) for the RS School assignment.

## Prerequisites

- Node.js (v20.x or higher)

## Usage

Run the application using the `npm` script:

```bash
npm run start -- --username=your_username
```

## Features

### Navigation
 
 - up: Go to the parent directory.

 - cd path/to/dir: Change the current working directory.

 - ls: List files and folders in the current directory.

---

### File Operations

 - cat path/to/file: Read and print file content.

 - add new_file_name: Create a new empty file.

 - rn old_name new_name: Rename a file.

 - cp source_file dest_dir: Copy a file.

 - mv source_file dest_dir: Move a file.

 - rm path/to/file: Delete a file.

### Directory Operations

 - mkdir new_dir_name: Create a new directory.

 - rmdir path/to/dir: Delete a directory (and its content).

---

### Operating System

 - os --EOL: Get system End-Of-Line.

 - os --cpus: Get host machine CPUs info.

 - os --homedir: Get home directory.

 - os --username: Get system user name.

 - os --architecture: Get CPU architecture.

---

### Hashing

 - hash path/to/file: Calculate SHA-256 hash for a file.

---

### Compression

 - compress path/to/file path/to/dest: Compress a file using Brotli.

 - decompress path/to/file.br path/to/dest: Decompress a Brotli file.

---

Exit
.exit or Ctrl+C: Terminate the application.
