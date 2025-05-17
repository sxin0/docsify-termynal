/**
 * simple allert
 *
 * @author openpineaple <openpineaple@gmail.com>
 * @version 0.0.1
 * @license MIT
 */

function simpleTxtAlerts(hook, vm) {
  const iconMap = {
    NOTE: 'ℹ️',
    WARNING: '⚠️',
    DANGER: '❗',
    TIP: '💡',
    INFO: '🔍',
    SUCCESS: '✅',
    QUESTION: '❓',
    HINT: '📌'
  };

  hook.beforeEach(function (content) {
    return content.replace(/^> \[(NOTE|WARNING|DANGER|TIP|INFO|SUCCESS|QUESTION|HINT)\]\n> (.+)$/gim,
      (_, type, text) => {
        const icon = iconMap[type] || '';
        return `<div class="txt-alert txt-${type.toLowerCase()}"><span>${icon} [${type}]</span> ${text}</div>`;
      }
    );
  });
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [].concat(simpleTxtAlerts, window.$docsify.plugins || []);