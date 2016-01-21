var RelativeSelect2 = function()
{
    this.nameAtt = 'data-select2-parent-name';
    this.urlAtt =  'data-select2-url';
}

RelativeSelect2.prototype.init = function()
{
    var self = this;
    this.parents = this.getParents();
    $.each(this.parents,function(index,parent) {
        var $el = $('[name="'+parent.name+'"]');
        self.bindEvents(parent);
        self.update($el,parent);
    });
}

RelativeSelect2.prototype.bindEvents = function(parent)
{
    var self = this;
    $('[name="'+parent.name+'"]') .on('change',function(e){
        self.update($(this),parent);
    })
}

RelativeSelect2.prototype.getData = function(url,query)
{
    var d = $.Deferred();
    $.ajax({
        type: 'GET',
        data: {'query':query},
        url: url,
        success: function(data){
            d.resolve(data.results);
        }
    })
    return d.promise();
}

RelativeSelect2.prototype.getParents = function()
{
    var self = this;
    var parents = [];
    $('select['+self.nameAtt+']').each(function(){
        parents.push({
            name:$(this).attr(self.nameAtt),
            childName:$(this).attr('name'),
            url:$(this).attr(self.urlAtt)
        });
    });
    return parents;
}

RelativeSelect2.prototype.update = function($el,parent)
{
    var self = this,
        child = $('[name="'+parent.childName+'"]'),
        url = child.attr(self.urlAtt),
        value = $el.val(),
        selectedItems = child.attr('data-select2-selected-items').split(',');

    self.getData(url,value).then(function(data){
        self.updateSelect2(child,data,selectedItems);
    })
}

RelativeSelect2.prototype.updateSelect2 = function(select,items,selectedItems)
{
    var selectedItems = selectedItems || [];
    var $select = select;
    var options = $select.data('select2').options.options;
    $select.html('');
    for (var i = 0; i < items.length; i++) {
        var attribute = ($.inArray(items[i].id+"",selectedItems)>-1)?'selected':'';
        $select.append("<option "+attribute+" value=\"" + items[i].id + "\" >" + items[i].text + "</option>");
    }
    options.data = items;
    if (items.length)
        options.disabled = false;
    else
        options.disabled = true;

    $select.select2(options);
}

var relativeSelect2 = new RelativeSelect2();
relativeSelect2.init();