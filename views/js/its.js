$(document).ready(function () {
    localStorage.tabs = '[{"name": "即時監視", "path": "http://localhost/realtime" }]'
    localStorage.at = 'http://localhost/realtime'
    $('#display').load('/realtime')
    renderTabs()

    $('#tabs>li>a').click((e) => {
        e.preventDefault()
        // e.stopPropagation();
        console.log(e)
        route(e)
    })
    // $('#tab-remove').click((e) => {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     const tabs = JSON.parse(localStorage.tabs)
    //     tabs.filter(t => t.name !== e.target.dataset.name)
    //     localStorage.tabs = JSON.stringify(tabs)
    //     renderTabs()
    // })
})
function renderTabs(tabs = JSON.parse(localStorage.tabs)) {
    var html = ''
    console.log(localStorage.at)
    for (var i = 0; i < tabs.length; i++) {
        const t = tabs[i]
        console.log(t, t.path === localStorage.at)
        html += `<li role="presentation" class="${t.path === localStorage.at ? 'active' : ''}">
        <a href="#"> ${t.name} <span class="badge">
                <i class="glyphicon glyphicon-remove" id='tab-remove' data-name='${t.name}'></i>
            </span>
        </a></li>`
    }
    $('#tabs').html(html)
}
function route(e) {
    e.preventDefault();
    // console.log(e.target)
    var name = e.target.text.trim()
    var path = e.target.href
    if (localStorage.at !== path) {
        $('#display').load(path)
        localStorage.at = path
        var tabs = JSON.parse(localStorage.tabs)
        for (var i = 0; i < tabs.length; i++) {
            if (path === tabs[i].path) {
                // console.log('same')
                renderTabs(tabs)
                return
            }
        }
        tabs.push({ name, path })
        console.log(tabs)
        localStorage.tabs = JSON.stringify(tabs)
        renderTabs()
    }

}
