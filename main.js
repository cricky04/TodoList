var totalItems=0;

function updateItemStatus()
{
    var chId = this.id.replace('cb_', '');//id를 받아서 cd_를 뗀다
    var itemText = document.getElementById('item_'+chId);
    
    var didlist=document.getElementById('didlist');
    var todolist=document.getElementById('todolist');

    var parentObject = document.getElementById('li_'+chId);

    if(this.checked)
    {
        itemText.className='checked';
        didlist.appendChild(parentObject);

    }
    else
    {
        itemText.className='';
        todolist.appendChild(parentObject);
    }
}

function deleteThis()
{
    var chId=this.id.replace('db_','');
    var deleteElement = document.getElementById('li_'+chId);
    var checkBox = document.getElementById('cb_'+chId);
    var list;

    if(checkBox.checked)
    {
        list=document.getElementById('didlist');
    }
    else
    {
        list=document.getElementById('todolist');
    }
    renameElementId(chId);
    list.removeChild(deleteElement);
    
    setTotalItems();
}

function renameElementId(chId)
{
    for(var i=chId+1;i<=totalItems;i++)
    {
        var listItem = document.getElementById('li_'+i);
        var checkBox = document.getElementById('cb_'+i);
        var deleteButton = document.getElementById('db_'+i);
        var deadLine = document.getElementById('dl_'+i);
        var span = document.getElementById('item_'+i);

        listItem.id='li_'+i-1;
        checkBox.id='cb_'+i-1;
        deleteButton.id='db_'+i-1;
        deadLine.id='dl_'+i-1;
        span.id='item_'+i-1;
        deleteCookie(i);
    }
    totalItems--;
    for(var i=chId;i<=totalItems;i++)
    {
        var listItem = document.getElementById('li_'+i);
        var checkBox = document.getElementById('cb_'+i);
        var deleteButton = document.getElementById('db_'+i);
        var deadLine = document.getElementById('dl_'+i);
        var span = document.getElementById('item_'+i);

        itemText=span.innerText;
        dDayTime=deadLine.innerText;

        if(listItem.className=='checked') setCookie(i,itemText,true,dDayTime);
        else setCookie(i,itemText,false,dDayTime);
        setCookie(i,listItem,isChecked)
    }
}

function addNewItem(list, itemText,isChecked, dDayTime)
{
    totalItems++;
    var listItem = document.createElement('li');
    var checkBox = document.createElement('input');
    var deleteButton = document.createElement('input');
    var deadLine = document.createElement('span');
    

    listItem.id='li_'+totalItems;

    checkBox.type='checkbox';
    checkBox.id='cb_'+totalItems;
    checkBox.onclick = updateItemStatus;
    if(isChecked) updateItemStatus;

    var span = document.createElement('span');
    span.id = 'item_' +totalItems;
    span.innerText = itemText;

    deleteButton.type='button';
    deleteButton.id='db_'+totalItems;
    deleteButton.onclick = deleteThis;

    deadLine.id='dl_'+totalItems;
    deadLine.innerText = dDayTime;
    deadLine.style.marginLeft = '200px';

    listItem.appendChild(deleteButton);
    listItem.appendChild(checkBox);
    listItem.appendChild(span);
    listItem.appendChild(deadLine);
    list.appendChild(listItem);

    setCookie(totalItems,itemText,isChecked,dDayTime);
    setTotalItems();
}

var setTotalItems = function() {
    deleteCookie('totalItems');
    document.cookie = 'totalItems='+totalItems;
};

var setCookie = function(id,itemText, isChecked, dDayTime) {
    document.cookie = id + '=' + itemText + '_' + isChecked +'_'+ dDayTime + ';expires=' + dDayTime + ';path=/';
};

var getCookie = function(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
};
    
var deleteCookie = function(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
};
    
function loadCookie()
{
    totalItems=getCookie('totalItems');
    for(var i=1;i<=totalItems;i++)
    {
        var tmp;
        tmp=getCookie(i).split('_');
        if(tmp[1]) addNewItem(document.getElementById('didlist'),tmp[0],tmp[1],tmp[2]);
        else addNewItem(document.getElementById('todolist'),tmp[0],tmp[1],tmp[2]);
        
    }
}



    
var dDay=document.getElementById('dDay');
var inputText=document.getElementById('inputText');
inputText.focus();
loadCookie();


inputText.onkeyup=function(event)
{
    if(event.which === 13)
    {
        var dDayTime = dDay.value;
        var itemText = inputText.value;
        inputText.value = '';
        dDay.value = '';
        if(!itemText) return false;
        addNewItem(document.getElementById('todolist'),itemText,false,dDayTime);
        inputText.focus;
        inputText.select;
    }
};
