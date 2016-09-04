$(function($){

    if (!$('.crons').children().length) {
        $('#add').addClass('hidden');
        $('.form').removeClass('hidden');
    }

    $('#save').on('click', function() {
        $('.form input').removeClass('error');
        $('.form label.error').html('');

        var name = $('.form input[name=name]').val();
        var time = $('.form input[name=time]').val();
        $.ajax({
            type: 'POST',
            url: '/cron',
            data: {name: name, time: time},
            success: function(data) {
                location.reload();
            },
            error: function(xhr) {
                let error = JSON.parse(xhr.response);
                if (error.name) {
                    $('.form input[name=name]').addClass('error');
                    $('label.error[name=name]').html(error.name);
                }
                if (error.time) {
                    $('.form input[name=time]').addClass('error');
                    $('label.error[name=time]').html(error.time);
                }
            }
        });
    });

    $('#cancel').on('click', function() {
        $('#add').removeClass('hidden');
        $('.form').addClass('hidden');
    });

    $('#add').on('click', function() {
        $('#add').addClass('hidden');
        $('.form').removeClass('hidden');
    });;
});
