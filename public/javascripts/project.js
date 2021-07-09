$(document).ready(function(){
    $.getJSON("/bank/fetching",{cid:$('#cid').val()},function(data){
        $.each(data,function(index,item){
            // alert(item.statenam)
            $('#ppl').append($('<option>').text(item.name).val(item.id))
        })
        
    })
    $('#ppl').change(function(){ 
    $('#nm').empty()
    $('#pl').empty()
    $.getJSON("/bank/fetchmoney",{sid:$('#ppl').val()},function(data){
        $.each(data,function(index,item){
            $('#nm').val(item.money)
            $('#pl').val(item.id)
            $('#pnam').val(item.name)
     })
})
})
})