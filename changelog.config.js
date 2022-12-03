const compareFunc = require("compare-func");

const typeMap = {
  feat: "✨",
  fix: "🐛",
  docs: "📝",
  style: "💄",
  ui: "🎨",
  perf: "⚡",
  refactor: "🧩",
  test: "✅",
  revert: "⏪",
  build: "👷",
  ci: "🔩",
  chore: "🧱",
};

module.exports = {
  writerOpts: {
    transform: (commit, context) => {
      let discard = true;
      const issues = [];

      commit.notes.forEach((note) => {
        note.title = "BREAKING CHANGES";
        discard = false;
      });

      if (commit.type && commit.type !== null) {
        commit.type = typeMap[commit.type] + " " + commit.type;
      } else return;

      if (commit.scope === "*") {
        commit.scope = "";
      }

      commit.subject = `${commit.type}: ` + commit.subject;

      // if (commit?.authorName) {
      //   commit.subject += `-- ${commit.authorName}.`
      // }

      if (typeof commit.hash === "string") {
        commit.hash = commit.hash.substring(0, 7);
      }

      if (typeof commit.subject === "string") {
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl;

        // console.log('==>', commit)

        if (url && commit.footer !== null) {
          // url = `${url}/issues/`
          // Issue URLs.
          const regexJIRA = /#([0-9A-Za-z]+-[0-9]+)/g;
          const regexZENTAO = /#([0-9]+)/g;
          // JIRA issues
          if (regexJIRA.test(commit.footer)) {
            let issues = commit.footer.match(regexJIRA);
            let issuesTxt = issues
              .map((issue) => {
                return `[${issue}](http://10.8.40.130:8081/browse/${issue.replace(
                  "#",
                  ""
                )})`;
              })
              .join("，");

            commit.subject = commit.subject + "（closes " + issuesTxt + "）";

            // commit.footer = commit.footer.replace(/#([0-9A-Za-z]+-[0-9]+)/g, (match, issue) => {
            //   console.log('==>', match, issue)
            // issues.push(issue)
            // return `[#${issue}](${url}${issue})`
            // })
          }

          // 禅道 issues
          if (regexZENTAO.test(commit.footer)) {
            let issues = commit.footer.match(regexZENTAO);
            let issuesTxt = issues
              .map((issue) => {
                return `[${issue}](http://10.8.8.162/zentao/bug-view-${issue.replace(
                  "#",
                  ""
                )}.html)`;
              })
              .join("，");

            commit.subject = commit.subject + "（closes " + issuesTxt + "）";
          }
        }

        if (context.host) {
          // User URLs.
          commit.subject = commit.subject.replace(
            /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
            (_, username) => {
              if (username.includes("/")) {
                return `@${username}`;
              }
              return `[@${username}](${context.host}/${username})`;
            }
          );
        }
      }

      // remove references that already appear in the subject
      // commit.references = commit.references.filter(reference => {
      //   if (issues.indexOf(reference.issue) === -1) {
      //     return false
      //   }
      //   return false
      // })
      commit.references = "";
      return commit;
    },
    groupBy: "committerDate",
    commitGroupsSort: "type",
    commitsSort: ["scope", "subject"],
    noteGroupsSort: "title",
    notesSort: compareFunc,
  },
};
