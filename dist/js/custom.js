const div = document.querySelector('.github-topic-projects')

function setupTermynal() {
    document.querySelectorAll(".use-termynal").forEach(node => {
        node.style.display = "block";
        new Termynal(node, {
            lineDelay: 300
        });
    });
    const progressLiteralStart = ">> 100%";
    const promptLiteralStart = "$ ";
    const customPromptLiteralStart = "## ";
    const termynalActivateClass = "termy";
    let termynals = [];

    function createTermynals() {
        document
            .querySelectorAll(`.${termynalActivateClass}`)
            .forEach(node => {
                const text = node.textContent;
                const lines = text.split("\n");
                const useLines = [];
                let buffer = [];
                function saveBuffer() {
                    if (buffer.length) {
                        let isBlankSpace = true;
                        buffer.forEach(line => {
                            if (line) {
                                isBlankSpace = false;
                            }
                        });
                        dataValue = {};
                        if (isBlankSpace) {
                            dataValue["delay"] = 0;
                        }
                        if (buffer[buffer.length - 1] === "") {
                            // A last single <br> won't have effect
                            // so put an additional one
                            buffer.push("");
                        }
                        const bufferValue = buffer.join("<br>");
                        dataValue["value"] = bufferValue;
                        useLines.push(dataValue);
                        buffer = [];
                    }
                }

                for (let line of lines) {
                    if (line === progressLiteralStart) {
                        saveBuffer();
                        useLines.push({
                            type: "progress",
                        });
                    } else if (line.startsWith(promptLiteralStart)) {
                        saveBuffer();
                        var value = line.replace(promptLiteralStart, "").trimEnd();
                        value = value.replace(/^\s+/, function (match) {
                            var spaces = '';
                            for (var i = 0; i < match.length; i++) {
                                spaces += '&nbsp;';
                            }
                            return spaces;
                        })
                        useLines.push({
                            type: "input",
                            value: value
                        });
                    } else if (line.startsWith("// ")) {
                        saveBuffer();
                        const value = "💬 " + line.replace("// ", "").trimEnd();
                        useLines.push({
                            value: value,
                            class: "termynal-comment",
                            delay: 0
                        });
                    } else if (line.startsWith(customPromptLiteralStart)) {
                        saveBuffer();
                        const promptStart = line.indexOf(promptLiteralStart);
                        if (promptStart === -1) {
                            console.error("Custom prompt found but no end delimiter", line)
                        }
                        const prompt = line.slice(0, promptStart).replace(customPromptLiteralStart, "")
                        let value = line.slice(promptStart + promptLiteralStart.length);
                        useLines.push({
                            type: "input",
                            value: value,
                            prompt: prompt
                        });
                    } else {
                        line = line.replace(/^\s+/, function (match) {
                            var spaces = '';
                            for (var i = 0; i < match.length; i++) {
                                spaces += '&nbsp;';
                            }
                            return spaces;
                        })
                        buffer.push(line);
                    }
                }
                saveBuffer();
                const div = document.createElement("div");
                node.replaceWith(div);
                const termynal = new Termynal(div, {
                    lineData: useLines,
                    noInit: true,
                    lineDelay: 300
                });
                termynals.push(termynal);
            });
    }

    function loadVisibleTermynals() {
        termynals = termynals.filter(termynal => {
            if (termynal.container.getBoundingClientRect().top - innerHeight <= 0) {
                termynal.init();
                return false;
            }
            return true;
        });
    }

    window.addEventListener("scroll", loadVisibleTermynals);
    createTermynals();
    loadVisibleTermynals();
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

async function showRandomAnnouncement(groupId, timeInterval) {
    const announceFastAPI = document.getElementById(groupId);
    if (announceFastAPI) {
        let children = [].slice.call(announceFastAPI.children);
        children = shuffle(children)
        let index = 0
        const announceRandom = () => {
            children.forEach((el, i) => {
                el.style.display = "none"
            });
            children[index].style.display = "block"
            index = (index + 1) % children.length
        }
        announceRandom()
        setInterval(announceRandom, timeInterval
        )
    }
}

function beforeEach(content) {
    return content.replace(/```term[\r\n]([\s\S]*?)[\r\n]```/g, '\n<pre class="termy">$1</pre>');
}
