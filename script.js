$(document).ready(function() {
    // Carregar anotações salvas ao iniciar
    loadAnotacoes();

    // Evento de clique no botão "Salvar" ou "Editar"
    $('#salvarBtn').click(function() {
        var materia = $('#materiaSelect').val();
        var anotacoes = $('#anotacoesTextarea').val();
        
        // Verificar se há anotações
        if (anotacoes.trim() !== '') {
            // Verificar se a matéria já possui anotações
            if (localStorage.getItem(materia)) {
                // Confirmar edição
                if (confirm('Tem certeza de que deseja editar estas anotações?')) {
                    // Editar anotações no armazenamento local
                    localStorage.setItem(materia, anotacoes);
                }
            } else {
                // Salvar novas anotações no armazenamento local
                localStorage.setItem(materia, anotacoes);
            }
            // Recarregar anotações
            loadAnotacoes();
            // Limpar campos
            $('#materiaSelect').val('');
            $('#anotacoesTextarea').val('');
        } else {
            alert('Por favor, insira algumas anotações antes de salvar.');
        }
    });

    // Evento de clique em uma anotação para edição
    $(document).on('click', '#anotacoesContainer .list-group-item', function() {
        var materia = $(this).data('materia');
        var anotacoes = localStorage.getItem(materia);
        $('#materiaSelect').val(materia);
        $('#anotacoesTextarea').val(anotacoes);
    });

    // Evento de clique no botão de apagar anotações
    $(document).on('click', '.apagar-btn', function(event) {
        event.stopPropagation();
        var materia = $(this).data('materia');
        // Confirmar exclusão
        if (confirm('Tem certeza de que deseja apagar estas anotações?')) {
            // Remover anotações do armazenamento local
            localStorage.removeItem(materia);
            // Recarregar anotações
            loadAnotacoes();
        }
    });

    // Função para carregar anotações salvas
    function loadAnotacoes() {
        $('#anotacoesContainer').empty();
        for (var i = 0; i < localStorage.length; i++) {
            var materia = localStorage.key(i);
            var anotacoes = localStorage.getItem(materia);
            // Adicionar anotações à lista
            $('#anotacoesContainer').append('<li class="list-group-item" data-materia="' + materia + '"><strong>' + materia.charAt(0).toUpperCase() + materia.slice(1) + '</strong><br>' + anotacoes + '<button type="button" class="close apagar-btn" aria-label="Close" data-materia="' + materia + '"><span aria-hidden="true">&times;</span></button></li>');
        }
    }
});
