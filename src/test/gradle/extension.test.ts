import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';

import { GradleTaskTreeItem } from '../../gradleView';

const extensionName = 'richardwillis.vscode-gradle';
const fixtureName = process.env.FIXTURE_NAME || '(unknown fixture)';

describe(fixtureName, () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should be present', () => {
    assert.ok(vscode.extensions.getExtension(extensionName));
  });

  it('should be activated', () => {
    const extension = vscode.extensions.getExtension(extensionName);
    assert.ok(extension);
    if (extension) {
      assert.equal(extension.isActive, true);
    }
  });

  // eslint-disable-next-line sonarjs/cognitive-complexity
  describe('tasks', () => {
    it('should load gradle tasks', async () => {
      const tasks = await vscode.tasks.fetchTasks({ type: 'gradle' });
      assert.equal(tasks.length > 0, true);
      const helloTask = tasks.find(({ name }) => name === 'hello');
      assert.ok(helloTask);
    });

    it('should refresh gradle tasks when command is executed', async () => {
      const extension = vscode.extensions.getExtension(extensionName);
      assert.ok(extension);
      const stub = sinon.stub(extension!.exports.treeDataProvider, 'refresh');
      await vscode.commands.executeCommand('gradle.refresh');
      assert.ok(stub.called);
    });

    it('should run a gradle task', async () => {
      const extension = vscode.extensions.getExtension(extensionName);
      assert.ok(extension);
      const task = (await vscode.tasks.fetchTasks({ type: 'gradle' })).find(
        ({ name }) => name === 'hello'
      );
      assert.ok(task);
      const outputChannel = extension!.exports.outputChannel;
      sinon.stub(outputChannel, 'appendLine');
      await new Promise(resolve => {
        vscode.tasks.onDidEndTaskProcess(e => {
          if (e.execution.task === task) {
            resolve();
          }
        });
        vscode.tasks.executeTask(task!);
      });
      assert.ok(
        outputChannel.appendLine.calledWith(sinon.match('Hello, World!'))
      );
    });

    it('should run a gradle task with custom args', async () => {
      sinon
        .stub(vscode.window, 'showInputBox')
        .returns(Promise.resolve('-PcustomProp=foo'));

      const extension = vscode.extensions.getExtension(extensionName);
      assert.ok(extension);

      const task = (await vscode.tasks.fetchTasks({ type: 'gradle' })).find(
        ({ name }) => name === 'helloProjectProperty'
      );
      assert.ok(task);

      const outputChannel = extension!.exports.outputChannel;
      sinon.stub(outputChannel, 'appendLine');
      await new Promise(resolve => {
        // eslint-disable-next-line sonarjs/no-identical-functions
        vscode.tasks.onDidEndTaskProcess(e => {
          if (e.execution.task.definition.script === task?.definition.script) {
            resolve();
          }
        });
        const treeItem = new GradleTaskTreeItem(
          extension!.exports.context,
          new vscode.TreeItem('parentTreeItem'),
          task!,
          task!.name,
          task!.definition.description
        );
        vscode.commands.executeCommand('gradle.runTaskWithArgs', treeItem);
      });
      assert.ok(
        outputChannel.appendLine.calledWith(
          sinon.match('Hello, Project Property!foo')
        )
      );
    });
  });

  describe('logging', () => {
    it('should show command statements in the outputchannel', async () => {
      const extension = vscode.extensions.getExtension(extensionName);
      assert.ok(extension);
      const outputChannel = extension!.exports.outputChannel;
      sinon.stub(outputChannel, 'appendLine');
      await vscode.commands.executeCommand('gradle.refresh');
      assert.ok(
        outputChannel.appendLine.calledWith(sinon.match('CONFIGURE SUCCESSFUL'))
      );
    });
  });
});
