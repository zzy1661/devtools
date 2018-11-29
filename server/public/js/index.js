var app = new Vue({
    el: '#app',
    data:{
        file1:[],
        file2:[]
    }
})

$('#file1btn').on('click',function() {
    var l = $('#file1').val().trim();
    if(l){
        getFileContent(l,app.$data.file1) 
    }
})
$('#file2btn').on('click',function() {
    var l = $('#file2').val().trim();
    if(l){
        getFileContent(l,app.$data.file2) 
    }
})

function getFileContent(l,fileContainer) {
    l = l.replace(/\\/g,'/');
    var p = new Promise((resolve,reject)=>{
        postFileLocation(l).done(res=>{
            resolve(res)
        }).then(res=>{
            res = JSON.parse(res);
            fileContainer.splice(0,fileContainer.length); 
            Array.prototype.push.call(fileContainer,...(res.content.replace(/\t/g,'  ').split(/\n/)));
            return (initWs(res.chanelId))
        }).then(socket=>{
            socket.on('save',(msg)=>{
                if(msg && msg.content) {
                    fileContainer.splice(0,fileContainer.length); 
                    Array.prototype.push.call(fileContainer,...(msg.content.replace(/\t/g,'  ').split(/\n/)));
                }
            })
        })
    })
    return 
}
function postFileLocation(location) {
    return $.post('/fileCheck',{file:location})
}
function initWs(chanelId) {
    var socket = io(`http://localhost:8080/${chanelId}`);
    return socket;			
} 

