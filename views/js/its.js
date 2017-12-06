$(document).ready(function () {
    // localStorage.tabs = '[{"name": "即時監視", "path": "http://localhost/realtime" }]'
    localStorage.at = '/realtime'
    const div = $(`<div id="realtime" class="tab-pane fade in active"></div>`)
    $('#display').append(div.load('realtime'))
    // renderTabs()

    // $('#tabs>li>a').click((e) => {
    //     e.preventDefault()
    //     // e.stopPropagation();
    //     console.log(e)
    //     route(e)
    // })
    // $('#tab-remove').click((e) => {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     console.log(e)
    //     $(e.target).remove()
    //     // const tabs = JSON.parse(localStorage.tabs)
    //     // tabs.filter(t => t.name !== e.target.dataset.name)
    //     // localStorage.tabs = JSON.stringify(tabs)
    //     // renderTabs()
    // })
})
function addTabs(name, path) {
    var html = ''
    const tabsNum = $('#tabs li').length + 1
    const newTab = $(`<li
    >
    <a href="#${path}" data-toggle="tab" data-path="${path}"> 
        ${name}
    <button type="button" class="btn btn-warning btn-xs close-tab" data-path="${path}"><span class="glyphicon glyphicon-remove" data-path="${path}"></span></button>
    </a></li>`)
    $('#tabs').append(newTab)
    const div = $(`<div id="${path}" class="tab-pane fade"></div>`)
    $('#display').append(div.load(path))
    console.log('tabs length:', tabsNum)
    $(`#tabs li a[href="#${path}"]`).tab('show')
    $('button.close-tab').click(e=>removeTab(e))
}
function removeTab(e) {
    const { path } = e.target.dataset;
    console.log('remove ', e.target, path)
    const tab = $(`#tabs a[href="#${path}"]`);
    console.log(tab, 'parent', tab.parent())
    // console.log('parent', tab.parent())
    if (tab.parent()[0].className.includes('active')) {
        const preTab = tab.parent().prev().children()
        console.log('preTab:', preTab)
        preTab.tab('show')
    }
    tab.parent().remove()
    $(`#${path}`).remove();
}
function route(e) {
    e.preventDefault();
    // console.log(e.target)
    var name = e.target.text.trim()
    var path = e.target.dataset.path.trim().substring(1)
    const tabs = $('#tabs li a')
    for (let i = 0; i < tabs.length; i++){
        if (tabs[i].dataset.path === path) {
            $(`#tabs li a[href="#${path}"]`).tab('show')
            return
        }
    }
    // console.log(localStorage.at, path)
    // if (localStorage.at !== path) {
    //     localStorage.at = path
    //     const tabs = $('#tabs li')
    //     // var tabs = JSON.parse(localStorage.tabs)
    //     console.log(name, tabs.length)
    //     for (let i = 0; i < tabs.length; i++) {
    //         console.log(tabs[i].dataset.name)
    //         if (name === tabs[i].dataset.name) {
    //             // tabs[0].tab('show')
    //             console.log('same')
    //             return
    //         }
    //     }
    //     console.log('new ', localStorage.at)
        addTabs(name, path)
        // tabs.push({ name, path })
        // console.log(tabs)
        // localStorage.tabs = JSON.stringify(tabs)
        // addTabs(name, path)
    // }

}
