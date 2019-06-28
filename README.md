# wssgui
A GUI for the WSS board, written in JavaScript using Electron and React.

## Setting up development environment on Windows
1. Install the required software
   * [Git](https://git-scm.com/download/)
     * Note: When installing Git, you should use the default options
   * [Nodejs](https://nodejs.org/en/) (select the LTS version)
   * [Visual Studio Code](https://code.visualstudio.com/)

1. Reboot your computer, and open up Visual Studio Code

1. Open an administrator PowerShell window (you can do this by going to
   the start menu, typing PowerShell, then right-clicking on PowerShell
   and selecting "Run as administrator"). Type the following command
   into powershell and press enter in order to install the required
   build tools:
   ```
   npm install --global windows-build-tools
   ```
   After the command is complete, type `exit` and press enter to
   close PowerShell
   * Note: This command does not always complete successfully. If it freezes for
     longer than one minute, press Ctrl+c to cancel the command, run
     `npm remove --global windows-build-tools`, then reboot your computer
     and try again.

1. After you have installed the `windows-build-tools` in the previous
   step, open the file explorer and navigate to the folder where you
   would like to store the code. Once you are in that folder, right
   clich and select "Git Bash here" to open a Git Bash terminal.

1. In order to download the code, type the following command into the
   Git Bash command line, replacing `<Github repository URL>` with the
   URL of this repository, which you can copy-paste from your browser's
   address bar:
   ```
   git clone <Github repository URL>
   ```
   This command will download the code from Github and place it into a
   new folder.
   * Note: When copy-pasting into Git Bash, Ctrl+v does not work! Instead,
     you must right click and select "Paste", or alternatively press
     Shift+insert.

1. Open Visual Studio Code, go to File -> Open Folder, and open the
   folder that the `git clone` command created (the folder should be
   named "wssgui"). Then go to Terminal -> New Terminal to open a
   terminal window within Visual Studio Code.

1. Type the following command into the terminal to install all the
   required dependencies:
   ```
   npm install
   ```

1. The development environment is now ready! You can type `npm start`
   in order to run the code. If you'd like to stop running the code,
   press Ctrl+c in the terminal window. You can also create a portable
   .exe file to run on other computers by typing `npm run dist`. Please
   note, this command will take a few minutes to complete. After the 
   command finishes, you will notice a new folder called dist; inside
   this folder you will find a .exe file which can be run without
   installation by double-clicking on it.
