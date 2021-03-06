# VS Code Gradle Tasks

[![Marketplace Version](https://vsmarketplacebadge.apphb.com/version-short/richardwillis.vscode-gradle.svg)](https://marketplace.visualstudio.com/items?itemName=richardwillis.vscode-gradle)
[![Build status](https://img.shields.io/github/workflow/status/badsyntax/vscode-gradle/Build%20&%20Publish)](https://github.com/badsyntax/vscode-gradle/actions?query=workflow%3A"Build+%26+Publish")
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=badsyntax_vscode-gradle&metric=security_rating)](https://sonarcloud.io/dashboard?id=badsyntax_vscode-gradle)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/richardwillis.vscode-gradle)](https://marketplace.visualstudio.com/items?itemName=richardwillis.vscode-gradle)
[![GitHub bug issues](https://img.shields.io/github/issues/badsyntax/vscode-gradle/bug?label=bug%20reports)](https://github.com/badsyntax/vscode-gradle/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

Run Gradle tasks in VS Code.

![Gradle Tasks Screencast](images/screencast.gif)

## Requirements

- [VS Code >= 1.45.0](https://code.visualstudio.com/download)
- [Java >= 8](https://adoptopenjdk.net/)
- Local Gradle wrapper executables must exist at the root of the workspace folders

## Features

This extension provides a visual interface for your Gradle build. It supports whatever Gradle supports and is language agnostic, but can work nicely alongside other extensions like the [Java language support extension](https://github.com/redhat-developer/vscode-java).

Access the Gradle views by clicking on the Gradle icon the [activity bar](https://code.visualstudio.com/docs/getstarted/userinterface).

<details><summary>List projects and tasks</summary>

A Gradle build can have one or more projects. Projects are listed in a flat list with the root project listed first, and sub-projects listed alphabetically thereafter.

When you expand a project, tasks are listed in a tree, grouped by the task group. You can toggle the display of the tasks by clicking on the `Show Flat List`/`Show Tree` button in the treeview header.

<img src="./images/gradle-tasks-view.png" width="350" alt="Gradle Tasks View" />

</details>
<details><summary>Run tasks</summary>

Tasks can be run via the `Gradle Tasks`, `Pinned Tasks` or `Recent Tasks` treeviews, or as vscode tasks via `Command Palette => Run Task`.

A running task will be shown with an animated "spinner" icon in the treeviews, along with `Cancel Task` & `Restart Task` buttons. The `Cancel Task` button will gracefully cancel the task. The `Restart Task` button will first cancel the task, then restart it.

<img src="./images/task-run.png" width="350" alt="Gradle Tasks Running" />

A task will be run a vscode terminal where you can view the task output.

Send a SIGINT signal (ctrl/cmd + c) in the terminal to gracefully cancel it.

<img src="./images/task-output.png" width="650" alt="Gradle Tasks Output" />

</details>
<details><summary>Debug JavaExec tasks</summary>

This extension provides an experimental feature to debug [JavaExec](https://docs.gradle.org/current/dsl/org.gradle.api.tasks.JavaExec.html) tasks. Before using this feature you need to install the [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug) and [Language Support for Java](https://marketplace.visualstudio.com/items?itemName=redhat.java) extensions.

To enable this feature you need to specify which tasks can be debugged within your project `.vscode/settings.json` file:

```json
"gradle.javaDebug": {
    "tasks": [
        "run",
        "test",
        "subproject:customJavaExecTask"
    ]
}
```

You should now see a `debug` command next to the `run` command in the Gradle Tasks view. The `debug` command will start the Gradle task with [jdwp](https://docs.oracle.com/en/java/javase/11/docs/specs/jpda/conninv.html#oracle-vm-invocation-options) `jvmArgs` and start the vscode Java debugger.

![Debug Screencast](images/debug-screencast.gif?1)

</details>
<details><summary>Pin tasks</summary>

As there could be many tasks in a Gradle project, it can be useful to pin commonly used tasks. Pinned tasks will be shown in a seperate view. Pin a task by accessing the task context menu (by right-clicking a task). You can also pin a task with specific arguments.

<img src="./images/pin-task.png" width="350" alt="Pin a Gradle Task" />

To remove a pinned a task, access the task context menu and select `Remove Pinned Task`, or clear all pinned tasks by clicking on the `Clear Pinned Tasks` button in the treeview header.

<img src="./images/remove-pinned-task.png" width="350" alt="Remove a pinned Gradle Task" />

> Protip: for easier access to pinned tasks, drag and drop the `Pinned Gradle Tasks` view into the explorer view.

</details>
<details><summary>List recent tasks</summary>

Recently run Gradle tasks are listed in a seperate treeview. This can be useful to see a history of tasks and to easily access the associated task terminals.

The number shown next to the task is the amount of times the task has been run. Click on the `Show Terminal` button next to a task to view the most recent terminal for that task. Click on the `Close Terminal/s` button to close the terminal/s for that task.

Click on the `Clear Recent Tasks` button in the treeview header to remove all recent tasks from the list, or click on the `Close All Terminals` button to close all task terminals.

<img src="./images/recent-tasks.png" width="350" alt="Recent Tasks" />

</details>
<details><summary>List & kill Gradle daemons</summary>

Gradle daemon processes are listed by their process ID in a seperate treeview and can have the following states: `IDLE`, `BUSY`, `STOPPED`, `STOPPING`, `CANCELED`.

Stop individual daemons by clicking on the `Stop Daemon` button next to the listed daemon.

Stop all daemons by clicking on the `Stop Daemons` button in the treeview header.

<img src="./images/gradle-daemons.png" width="350" alt="Recent Tasks" />

After stopping a daemon, it will remain in the `STOPPED` state for a while, but the underlying process won't exist. This is the default Gradle behaviour.

Most of the time there should be no reason to stop a daemon. View more info on the [Gradle Daemon](https://docs.gradle.org/current/userguide/gradle_daemon.html) from the Gradle website.

The extension uses the Gradle wrapper to list daemons, and is quite a slow process. If the daemon view is not useful for you, you can simply collapse the view, or disable it completely.

</details>
<details><summary>Full features list</summary>

- List Gradle Tasks & Projects
- Run [Gradle tasks](https://gradle.org/) as [VS Code tasks](https://code.visualstudio.com/docs/editor/tasks)
- Supports massive Gradle projects (eg with 10000+ tasks)
- Uses the [Gradle Tooling API](https://docs.gradle.org/current/userguide/third_party_integration.html#embedding) to discover and run Gradle tasks
- Uses a long running gRPC server which provides good performance
- Supports Kotlin & Groovy build files
- Supports [multi-project builds](https://docs.gradle.org/current/userguide/multi_project_builds.html)
- Supports [multi-root workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces)
- Supports nested projects (enabled via setting)
- Show flat or nested tasks in the explorer
- Gracefully cancel a running task
- Debug JavaExec tasks
- Run/debug a task with arguments (supports both build & task args, eg `gradle tasks --all --info`)
- Pin tasks
- List recent tasks
- List & stop daemons

</details>

## VS Code Settings

This extension contributes the following settings:

- `gradle.autoDetect`: Automatically detect Gradle tasks
- `gradle.focusTaskInExplorer`: Focus the task in the explorer when running a task
- `gradle.nestedProjects`: Support nested projects (boolean or an array of directories)
- `gradle.javaDebug`: Debug JavaExec tasks (see below for usage)
- `gradle.debug`: Show extra debug info in the output panel
- `gradle.disableConfirmations`: Disable the warning confirm messages when performing batch actions (eg clear tasks, stop daemons etc)

## Gradle & Java Settings

Set Gradle & Java options with standard environment variables or standard Gradle settings (eg via `gradle.properties` or task configuration).

### Example Environment Variables

- `JAVE_HOME`
- `GRADLE_USER_HOME`

_Note, the VS Code settings take precedence over the environment variables._

<details><summary>Setting Project Environment Variables</summary>

You can use an environment manager like [direnv](https://direnv.net/) to set project specific environment variables, or set the variables in the terminal settings within `.vscode/settings.json`, for example:

```json
{
  "terminal.integrated.env.osx": {
    "GRADLE_USER_HOME": "${workspaceFolder}/.gradle"
  }
}
```

</details>

## Compatibility with the [Java language support](https://github.com/redhat-developer/vscode-java) extension

### VS Code Settings

This extension supports the following settings which are contributed by the [Java language support](https://github.com/redhat-developer/vscode-java) extension:

- `java.home`: Absolute path to JDK home folder used to launch the gradle daemons
- `java.import.gradle.user.home`: Setting for `GRADLE_USER_HOME`
- `java.import.gradle.jvmArguments`: JVM arguments to pass to Gradle
- `java.import.gradle.wrapper.enabled`: Enable/disable the Gradle wrapper
- `java.import.gradle.version`: Gradle version, used if the gradle wrapper is missing or disabled

### Class References

There are cases where Gradle tasks will generate Java classes. To ensure these Java classes are indexed correctly by the Java language server, you need to ensure the paths are added to the `.classpath`, and this is typically achieved using Gradle [`sourceSets`](https://docs.gradle.org/current/dsl/org.gradle.api.tasks.SourceSet.html).

Once you've configured your `sourceSets` correctly, follow these steps:

1. Generate your classes by running the relevant Gradle Task
2. Force the Language Server to index the generated classes by right-clicking on `build.gradle` and selecting `Update project configuration`.

At this point the gradle `sourceSet` paths will be added to the `.classpath` and the Language Server will automatically update references when those classes change.

## Extension API

This extension provides an API which can be used by 3rd-party vscode extensions.

👉 [Extension API](./API.md)

## Troubleshooting

<details><summary>View logs by selecting "Gradle Tasks" in the output panel</summary>

<img src="./images/output.png" width="800" alt="Gradle extension output" />

</details>

<details><summary>Set the "gradle.debug" setting to "true" to view debug logs in the output panel</summary>

<img src="./images/debug-output.png" width="800" alt="Gradle extension debug output" />

</details>

<details><summary>Task output will be shown in the Terminal panel</summary>

<img src="./images/task-output.png" width="800" alt="Gradle task output" />

</details>

<details><summary>Task output is truncated</summary>

The integrated terminal has a limited buffer size and will not show the full output for tasks that generate a large output. Increase the terminal buffer size in your settings, for example:

```json
{
  "terminal.integrated.scrollback": 5000
}
```

</details>

<details><summary>"Gradle: Configure project"</summary>

When you open a Gradle project for the first time, the Gradle wrapper will start downloading the Gradle distribution. This process can take a while. As there's no progress events emitted via the Tooling API for this process, the extension will simply report "Gradle: Configure project". You can however view progress by selecting the "Gradle Server" process in the terminal panel to view download progress.

</details>

<details><summary>"No connection to the gradle server. Try restarting the server"</summary>

<img src="./images/no-connection.png" width="500" />

This error means the Gradle Task server has stopped, or there was an error starting it. Click on "Restart Server" to restart it.

If you continue to get this error, view the task error messages by selecting "Gradle Server" in the Terminal panel.

The task server is started using a [shell script](https://gist.github.com/badsyntax/d71d38b1700325f31c19912ac3428042) generated by [CreateStartScripts](https://docs.gradle.org/current/dsl/org.gradle.jvm.application.tasks.CreateStartScripts.html). The script uses `#!/usr/bin/env sh` and is as portable as the gradle wrapper script. If there are any problems executing the start script then it's likely an issue either with your `PATH`, or Java is not installed.

### PATH problems

The following error demonstrates a typical issue with your `PATH`:

```shell
env: sh: No such file or directory
The terminal process terminated with exit code: 127
```

Use the following task to debug your shell environment within vscode:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Print task shell info",
      "type": "shell",
      "command": "echo \"Path: $PATH \nShell: $SHELL\"",
      "problemMatcher": []
    }
  ]
}
```

#### Fixing your `$PATH`

Check your dotfiles (eg `~/.bashrc`, `~/.bash_profile`, `~/.zshrc`) and fix any broken `PATH` exports, or override the `PATH` env var by setting `terminal.integrated.env` in your vscode settings, for example:

```json
"terminal.integrated.env.osx": {
  "PATH": "/put/your:/paths/here",
}
```

### Java path problems

You might see an error like:

```shell
ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
```

The start script [should find](https://gist.github.com/badsyntax/d71d38b1700325f31c19912ac3428042#file-gradle-tasks-server-sh-L85-L105) the path to Java in the usual locations. If you get this error it suggests an issues with your `$PATH` or you simply haven't installed Java. Run the gradle wrapper script (eg `./gradlew tasks`) to debug further.

### Shell environment

Another potential problem is that the `PATH` or `JAVA_HOME` environment vars have been defined within `.bashrc`. See `Issues with environment vars` in the next section to resolve this.

</details>

<details><summary>Issues with environment vars</summary>

VS Code will launch shells as non-interactive login shells, which runs the profile script (and not the rc script), meaning it will not be loading, for example, `~/.bashrc`. This means, if you've defined `PATH` or any other environment var within `.bashrc`, they will not be available for the server startup script and not be available to Gradle.

One potential approach to fix this, is to load `~/.bashrc` from within `~/.bash_profile`, for example:

```sh
if [ -r ~/.bashrc ]; then
  source ~/.bashrc
fi
```

Another approach is to force vscode to load shells as interactive. Set this in your `settings.json`:

```json
"terminal.integrated.shellArgs.linux": [
  "-i"
]
```

_(If you're on MacOS, change `linux` to `osx`.)_

</details>

<details><summary>"Orphaned" Java processes after quitting VS Code</summary>

You might notice some Java processes are not closed after existing VS Code. These processes are the Gradle Daemons that Gradle spawns. This is the default behaviour of Gradle.

You'll have `N` processes per Gradle version. Eventually Gradle will shut them down. Read more about the [Gradle Daemon](https://docs.gradle.org/current/userguide/gradle_daemon.html).

</details>

<details><summary>Incompatibility with other extensions</summary>

This extension is incompatible with the following extensions:

- [spmeesseman.vscode-taskexplorer](https://marketplace.visualstudio.com/items?itemName=spmeesseman.vscode-taskexplorer)

The reason for the incompatibility is due to the extensions providing the same tasks types (`gradle`) with different task definitions.

</details>

## Support

For general support queries, use the [#gradle-tasks](https://vscode-dev-community.slack.com/archives/C011NUFTHLM) channel in the [slack development community workspace](https://aka.ms/vscode-dev-community), or

- 👉 [Submit a bug report](https://github.com/badsyntax/vscode-gradle/issues/new?assignees=badsyntax&labels=bug&template=bug_report.md&title=)
- 👉 [Submit a feature request](https://github.com/badsyntax/vscode-gradle/issues/new?assignees=badsyntax&labels=enhancement&template=feature_request.md&title=)

## Contributing

Refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for instructions on how to run the project.

👉 [Architecture Overview](./ARCHITECTURE.md)

## Credits

- Originally forked from [Cazzar/vscode-gradle](https://github.com/Cazzar/vscode-gradle)
- Inspired by the built-in [npm extension](https://github.com/microsoft/vscode/tree/master/extensions/npm)
- Thanks to [@hanct](https://github.com/hanct) for providing feature suggestions and BETA testing
- Thanks to [@dcermak](https://github.com/dcermak) for providing inspiration to write some unit tests
- Thanks to all who have submitted bug reports and feedback

## Related Extensions

Check out [vscode-spotless-gradle](https://marketplace.visualstudio.com/items?itemName=richardwillis.vscode-spotless-gradle) which formats your source files using [Spotless](https://github.com/diffplug/spotless) & Gradle.

## Release Notes

See [CHANGELOG.md](./CHANGELOG.md).

## License

See [LICENSE.md](./LICENSE.md).
