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

        var opts = [
            'Multiplication Basics +5',
            'Multiplication Basics Double +5',
            'Multiplication Basics Halves',
            'Direct Multiplication',
            'Units and Tens'
        ];
        var bobs = createControlSelect("Type of Test",opts,function () {
            var s = $(this);
            var settings = get(ctable);
            settings.exercise_type = s.val();
            set(ctable,settings);
        })
        bobs[0].trigger('change');
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

        bobs = createControlInput("#Questions",function () {
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


        

        ctable.append(irow);
    })();

    var start = button("Start",trachtenberg.go);

    var lrow = row();
    for ( i = 0; i < 5;i++) {
        lrow.append(col("&nbsp;"));
    }
    lrow.append(col(start));
    ctable.append(lrow);
}
trachtenberg.go = function () {
    var s = get($('#trachtenberg_control_table'));
    console.log(s);
    if ( s.exercise_type == "Multiplication Basics +5") {
        trachtenberg.plus_five(s);
    }
}
trachtenberg.plus_five = function (s) {
    // first we generate a question set
    var qsts = [];
    if ( s.num_questions % 3 != 0 && s.num_questions % 4 != 0) {
        while ( s.num_questions % 3 != 0) {
            s.num_questions++;
        }
    }
    
    for ( var i = 0; i < s.num_questions; i++) {
        var d = Math.floor(Math.random() * 10);
        while ( d == 0 || d > 9) {
            d = Math.floor(Math.random() * 10);
        }
        var lbl = $('<label id="label_for_' + i + '"></label>');
        var inp = $('<input type="text" id="input_for_'+ i+'" size="4" />');
        inp.data('d',d);
        inp.on('blur',function () {
            var t = $(this);
            var d = t.data('d');
            var addon = 5;
            if ( d % 2 == 0) {
                addon = 0;
            }
            if ( t.val() == "" ) {
                return;
            }
            if (t.val() == (d+addon) ) {
                t.removeClass("red");
                t.addClass("green");
            } else {
                t.removeClass("green");
                t.addClass("red");
            }
        });
        lbl.html( (i+1) + "). " + d);
        var icol = col(lbl);
        icol.append(inp);
        
        qsts.push(icol);
    }
    var ctable = $("<table id='plus5table' width='80%' align='left'></table>")
    var r = row();
    var roll = 0;
    var l = qsts.length;
    if ( l % 4 == 0) {
        roll = 4;
    } else {
        roll = 3;
    }
    r.append('<th colspan='+roll+'>Multiplication Basics +5</th>');
    ctable.append(r);
    r = row();
    r.append('<td align="center" colspan="'+roll+'">Add 5 to the number <strong>IF</strong> it is odd.</td>')
    ctable.append(r);
    r = row();
    for ( i = 0; i < l; i++) {
        if ( i % roll == 0 ) {
            console.log("appending");
            ctable.append(r);
            r = row();
        }
        icol = qsts[i];
        icol.attr('width',(100/roll) + '%');
        icol.attr('align','right');
        r.append(icol);
    }
    ctable.append(r);
   $('#canvas').html(ctable);
}
registerPlugin("trachtenberg",trachtenberg.register);

