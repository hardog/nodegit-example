## nodegit examples

some examples which use nodegit@0.15.1 to perform git operations.

## basic concepts

Git四种对象:

- blob 保存改动或新增的文件
- tree 指向blob或者其他tree, 保存blob所在目录, 文件大小等信息
- commit 仅仅指向一个tree
- tags 标记

Git仓库三个工作区域:

- 工作区(work directory)
- 暂存区(stage or index)
- 本地仓库(history)

## usage

- first, change `constant.js` file to your own configs.
- second, `$ node ready.js` to do the predefined work.
- now, it's the time to run each file alone use node command.

## files

- [open.js](open.js)
- [stage.js](stage_index.js)
- [add_commit.js](add_commit.js)
- [checkout_branch.js](checkout_branch.js)
- [create_branch.js](create_branch.js)
- [get_branch.js](get_branch.js)
- [merge_branch.js](merge_branch.js)
- [push.js](push.js)

以下是一个完整的例子, 从添加文件到暂存区到最后推送到远程:

- [accmp.js](accmp.js)