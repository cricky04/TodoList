var totalItems=0;

function updateItemStatus()
{
    var chId = this.id.replace('cb_', '');//id를 받아서 cd_를 뗀다
    var itemText = document.getElementById('item_'+chId);

    if(this.checked)
    {
        itemText.className='checked';
    }
    else
    {
        itemText.className='';
    }
}

function deleteThis()
{
    var chId=this.id.replace('db_','');
    var deleteElement = document.getElementById('li_'+chId);
    var list=document.getElementById('todolist');
    renameElementId(chId);
    totalItems--;
    list.removeChild(deleteElement);
}

function renameElementId(chId)
{
    for(var i=chId+1;i<totalItems;i++)
    {
        var listItem = document.getElementById('li_'+chId);
        var checkBox = document.getElementById('cb_'+chId);
        var deleteButton = document.getElementById('db_'+chId);
        var deadLine = document.getElementById('dl_'+chId);
        var span = document.getElementById('item_'+chId);

        listItem.id='li_'+chId-1;
        checkBox.id='cb_'+chId-1;
        deleteButton.id='db_'+chId-1;
        deadLine.id='dl_'+chId-1;
        span.id='item_'+chId-1;
    }
}

function addNewItem(list, itemText,dDayTime)
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

    var span = document.createElement('span');
    span.id = 'item_' +totalItems;
    span.innerText = itemText;

    deleteButton.type='button';
    deleteButton.id='db_'+totalItems;
    deleteButton.onclick = deleteThis;

    deadLine.id='dl_'+totalItems;
    deadLine.innerText = dDayTime;

    listItem.appendChild(deleteButton);
    listItem.appendChild(checkBox);
    listItem.appendChild(span);
    listItem.appendChild(deadLine);
    list.appendChild(listItem);
}

var dDay=document.getElementById('dDay');
var inputText=document.getElementById('inputText');
inputText.focus();

inputText.onkeyup=function(event)
{
    if(event.which === 13)
    {
        var dDayTime = dDay.value;
        var itemText = inputText.value;
        inputText.value = '';
        dDay.value = '';
        if(!itemText) return false;
        addNewItem(document.getElementById('todolist'),itemText,dDayTime);
        inputText.focus;
        inputText.select;
    }
};
