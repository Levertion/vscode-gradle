import * as vscode from 'vscode';

export interface GradleTaskDefinition extends vscode.TaskDefinition {
  id: string;
  script: string;
  description?: string;
  group: string;
  project: string;
  // Only used internally for the tree data provider
  // TODO: Refactor GradleTasksTreeDataProvider so that this is not required
  buildFile?: string;
  projectFolder: string;
  args: string;
  javaDebug?: boolean;
}
