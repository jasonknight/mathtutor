var trachtenberg = {};

trachtenberg.register = function () {
    console.log("Yay, running");
    // now we need to create the interface
    $('ul.control-list').append('<li data-target="#trachtenberg">Trachtenberg</li>');
    $('div.control-tabs').append('<div id="trachtenberg" class="control-tab"></div>');
    $('#trachtenberg').append('<h2>Trachtenberg</h2>');
    $('#trachtenberg').append('<table id="trachtenberg_control_table"></table>');
    var ctable = $('#trachtenberg_control_table');

    // append an entry for num questions
    (function () {
        
        var irow = row();
        var bobs = createControlInput("#Questions",function () {
            var s = $(this);
            var settings = get(ctable);
            settings.num_questions = s.val();
            set(ctable,settings);
        })
        bobs[0].attr('size','3');
        bobs[0].val(10);
        bobs[0].trigger('keyup');
        irow.append(bobs[1]);
        irow.append(bobs[2]);
        var opts = ['NONE','all','3','4','5','6','7','8','9','11','12'];
        bobs = createControlSelect("Direct Multiplication",opts,function () {
            var s = $(this);
            var settings = get(ctable);
            settings.direct_multiplication = s.val();
            set(ctable,settings);
        })
        bobs[0].trigger('change');
        irow.append(bobs[1]);
        irow.append(bobs[2]);

        ctable.append(irow);
    })();

    var start = button("Start",trachtenberg.go);

    var lrow = row();
    lrow.append(col("&nbsp;"))
    lrow.append(col(start));
    ctable.append(lrow);
}
trachtenberg.go = function () {
    var s = get($('#trachtenberg_control_table'));
    console.log(s);
}
registerPlugin("trachtenberg",trachtenberg.register);

