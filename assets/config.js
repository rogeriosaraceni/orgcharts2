//https://balkan.app/OrgChartJS
//https://balkan.app/OrgChartJS/Docs/GettingStarted
//https://balkan.app/OrgChartJS/API/interfaces/OrgChart.options
//https://github.com/BALKANGraph/OrgChartJS

$(document).ready(function () {
    let bg_colors = ['#C92323', '#fff', '#fff', '#fff', '#fff', '#fff', "#fff"];
    let padding = 10;

    let widthColNodes = 180;
    let widthParameter = 500;
    let positionTexticonsParameter = 25;
    let positionTexticonsParameterCritical = 25;
    let positionXiconsParameter = 380;
    let positionYiconsParameter = 9;
    let widthTextParameter = 380;
    let widthTextParameterCritical = 280;

    let scaleValue = 0.95;

    const widthScreen = window.innerWidth

    if (widthScreen < 1681) {
        widthColNodes = 150;
        widthParameter = 415;
        positionTexticonsParameter = 22;
        positionTexticonsParameterCritical = 23;
        positionXiconsParameter = 305;
        positionYiconsParameter = 9;
        widthTextParameter = 290;
        widthTextParameterCritical = 270;
        scaleValue = 0.94;
    }
    if(widthScreen < 1441) {
        widthColNodes = 125;
        widthParameter = 400;
        positionTexticonsParameter = 22;
        positionTexticonsParameterCritical = 23;
        positionXiconsParameter = 300;
        positionYiconsParameter = 9;
        widthTextParameter = 240;
        widthTextParameterCritical = 240;
        scaleValue = 0.92;
    }

    let widthContentNodes = widthColNodes - (padding * 2);
    let eixoX = (widthContentNodes / 2) + padding;

    const titleKPI = "KPI Innovation";

    // Remover botão indicator quando precisar, é só adicionar no redraw
    const LEVEL_PLANT = 0;
    const LEVEL_AREA = 1;
    const LEVEL_SUBAREA = 2;
    const LEVEL_EQUIPMENT = 3;
    const LEVEL_INDICATOR = 4;
    const LEVEL_PARAMETER = 5;

    // Ajustado
    const customLevelNames = [
        "L1 Plant",
        "L2 Area",
        "L3 Subarea",
        "L4 Equipment",
        "L4 Indicator",
        "L5 Parameter"
    ];

    // Dados dos nodes 
    // Todos com "tags": ["node-parameter"], são o L5 Parameter
    const nodesData = [
        {
            "id": 1,
            "name": "Innovation",
            "urlCreate": "./popups/area/create/",
            "urlEdit": "./popups/edit/",
            "urlDel": "del.asp",
            "urlIndicator": "./indicator.html",
            "createTooltip": "Create new Area",
            "editTooltip": "Edit Plant",
            "delTooltip": "Delete Plant",
            "indicatorTooltip": "Create Indicator"
        },
        // L2 AREA
        {
            "id": 2,
            "pid": 1,
            "name": "Brewing",
            "urlCreate": "./popups/area/create/",
            "urlEdit": "./popups/edit/",
            "urlDel": "del.asp",
            "urlIndicator": "./indicator.html",
            "htmlContent": "<div>• Test</div><div>• Test</div><div>• Test</div><div>• Test</div><div>• Test</div><div>• Test</div><div>• Test</div><div>• Test</div><div>• Test</div><div>• Test</div>",
            "createTooltip": "Create new SubArea",
            "editTooltip": "Edit Area",
            "delTooltip": "Delete Area",
            "indicatorTooltip": "Create Indicator"
        },
        // L3 SUBAREA
        {
            "id": 3,
            "pid": 2,
            "name": "Cold Block",
            "urlCreate": "./popups/area/create/",
            "urlEdit": "./popups/edit/",
            "urlDel": "del.asp",
            "urlIndicator": "./indicator.html",
            "htmlContent": "",
            "createTooltip": "Create Equipament",
            "editTooltip": "Edit SubArea",
            "delTooltip": "Delete SubArea",
            "indicatorTooltip": "Create Indicator"
        },
        // // L4 EQUIPMENT
        {
            "id": 4,
            "pid": 3,
            "name": "Cold Block Beer Tank",
            "urlCreate": "./popups/area/create/",
            "urlEdit": "./popups/edit/",
            "urlDel": "del.asp",
            "urlIndicator": "./indicator.html",
            "createTooltip": "Create Indicator",
            "editTooltip": "Edit Equipament",
            "delTooltip": "Delete Equipament",
            "indicatorTooltip": "Create Indicator"
        },
        // // L4 INDICATOR
        {
            "id": 5,
            "pid": 4,
            "name": "CO2 Usage",
            "urlCreate": "./popups/area/create/",
            "urlEdit": "./popups/edit/",
            "urlDel": "del.asp",
            "urlIndicator": "./indicator.html",
            "createTooltip": "Create new Indicator Area",
            "editTooltip": "Edit Indicator Area",
            "delTooltip": "Delete Indicator Area",
            "indicatorTooltip": "Create Indicator"
        },
        // L5 PARAMETERS (DEVICES)
        {
            "id": 6,
            "pid": 5,
            "name": "Fermentation Vessel (FV)",
            "urlCreate": "./popups/area/create/",
            "urlEdit": "./popups/edit/",
            "urlDel": "del.asp",
            "urlParameter": "./popups/pi/list/?id_kpi=60&id_plant=60&id_area=1&id_subarea=16&id_equipamento=148&id_indicador=12&id_device=14&id_parent=268&type_control=view",
            "tags": ["node-parameter"],
            "createTooltip": "Create new PI",
            "editTooltip": "Edit Parameter",
            "delTooltip": "Delete Parameter"
        },
        {
            "id": 7,
            "pid": 5,
            "name": "Maturation Vessel (MV)",
            "urlCreate": "./popups/area/create/",
            "urlEdit": "./popups/edit/",
            "urlDel": "del.asp",
            "urlParameter": "./popups/pi/list/?id_kpi=60&id_plant=60&id_area=1&id_subarea=16&id_equipamento=148&id_indicador=12&id_device=15&id_parent=269&type_control=view",
            "tags": ["node-parameter"],
            "createTooltip": "Create new PI",
            "editTooltip": "Edit Parameter",
            "delTooltip": "Delete Parameter"
        },
        {
            "id": 8,
            "pid": 5,
            "name": "Stabilization Vessel (SV)",
            "urlCreate": "./popups/area/create/",
            "urlEdit": "./popups/edit/",
            "urlDel": "del.asp",
            "urlParameter": "./popups/pi/list/?id_kpi=60&id_plant=60&id_area=1&id_subarea=16&id_equipamento=148&id_indicador=12&id_device=16&id_parent=270&type_control=view",
            "tags": ["node-parameter"],
            "createTooltip": "Create new PI",
            "editTooltip": "Edit Parameter",
            "delTooltip": "Delete Parameter"
        },
        {
            "id": 9,
            "pid": 5,
            "name": "Beer Tanker",
            "urlCreate": "./popups/area/create/",
            "urlEdit": "./popups/edit/",
            "urlDel": "del.asp",
            "urlParameter": "./popups/pi/list/?id_kpi=60&id_plant=60&id_area=1&id_subarea=16&id_equipamento=148&id_indicador=12&id_device=17&id_parent=271&type_control=view",
            "tags": ["node-parameter"],
            "createTooltip": "Create new PI",
            "editTooltip": "Edit Parameter",
            "delTooltip": "Delete Parameter"
        },
        {
            "id": 10,
            "pid": 5,
            "name": "Cold Block CO2 Balancing System (COE)",
            "urlCreate": "./popups/area/create/",
            "urlEdit": "./popups/edit/",
            "urlDel": "del.asp",
            "tags": ["node-parameter"],
            "createTooltip": "Create new PI",
            "editTooltip": "Edit Parameter",
            "delTooltip": "Delete Parameter"
        }
    ];


    // Template personalizado btns e texts
    // -----------------------------------------------------------------------------------------------
    // Template personalizado padrão (ana)
    OrgChart.templates.ana = Object.assign({}, OrgChart.templates.ana);
    OrgChart.templates.ana.size = [widthColNodes, 0]; // Altura será definida dinamicamente
    OrgChart.templates.ana.node = `
        <rect x="0" y="0" width="{w}" height="{h}" fill="#fff" rx="10" ry="10" stroke-width="1px" stroke="#ccc"></rect>
        <foreignObject x="10" y="5" width="${widthContentNodes}" height="32">
            <div xmlns="http://www.w3.org/1999/xhtml" class="btn-group-node">
                <div class="btn-icon-node" data-node-id="{id}" data-btn-popup="create" data-tooltip="{createTooltip}">
                    <i class="fa fa-sitemap icon-rotate"></i>
                </div>
                <div class="btn-icon-node" data-node-id="{id}" data-btn-popup="edit" data-tooltip="{editTooltip}">
                    <i class="fa fa-pencil-square-o"></i>
                </div>
                <div class="btn-icon-node" data-node-id="{id}" data-btn-alert="del" data-tooltip="{delTooltip}">
                    <i class="fa fa-trash-o"></i>
                </div>
                <div class="btn-icon-node" data-node-id="{id}" data-btn-popup="indicator" data-tooltip="{indicatorTooltip}">
                    <i class="fa fa-sitemap"></i>
                </div>
            </div>
        </foreignObject>
        {field_name}
        {field_html_content}
    `;

    OrgChart.templates.ana.field_name = `
        <text
            class="node-name"
            data-width="${widthContentNodes}"
            data-text-overflow="multiline"
            x="${eixoX}"
            y="55"
            fill="#777"
            text-anchor="middle"
        >
            {val}
        </text>
    `;

    OrgChart.templates.ana.field_html_content = `
        <foreignObject 
            x="10" 
            y="70" 
            width="${widthContentNodes}" 
            height="20" 
        >
            <div xmlns="http://www.w3.org/1999/xhtml" class="html-content-indicator-title">Indicator</div>
        </foreignObject>

        <foreignObject 
            x="10" 
            y="95" 
            width="${widthContentNodes}" 
            height="100%" 
            class="html-content-container"
        >
            <div xmlns="http://www.w3.org/1999/xhtml" class="html-content-indicator">
                {val}
            </div>
        </foreignObject>
    `;

    // Template node-parameter (herda de base, mas pode herdar de ana para consistência)
    OrgChart.templates['node-parameter'] = Object.assign({}, OrgChart.templates.base);
    OrgChart.templates['node-parameter'].size = [widthParameter, 0];
    OrgChart.templates['node-parameter'].node = `
        <rect x="0" y="0" width="{w}" height="{h}" fill="#fff" rx="10" ry="10" stroke-width="1px" stroke="#ccc"></rect>
        {field_name_parameter}

        <foreignObject x="7" y="9" width="32" height="32">
            <div xmlns="http://www.w3.org/1999/xhtml">
                <div class="btn-icon-node btn-parameter" data-node-id="{id}" data-btn-popup="parameter" data-tooltip="Show PI's">
                    <i class="fa fa-table"></i>
                </div>
            </div>
        </foreignObject>

        <foreignObject x="${positionXiconsParameter}" y="${positionYiconsParameter}" width="${widthContentNodes}" height="32">
            <div xmlns="http://www.w3.org/1999/xhtml" class="btn-group-node">
                <div class="btn-icon-node" data-node-id="{id}" data-btn-popup="create" data-tooltip="{createTooltip}">
                    <i class="fa fa-sitemap icon-rotate"></i>
                </div>
                <div class="btn-icon-node" data-node-id="{id}" data-btn-popup="edit" data-tooltip="{editTooltip}">
                    <i class="fa fa-pencil-square-o"></i>
                </div>
                <div class="btn-icon-node" data-node-id="{id}" data-btn-alert="del" data-tooltip="{delTooltip}">
                    <i class="fa fa-trash-o"></i>
                </div>
            </div>
        </foreignObject>
    `;

    OrgChart.templates['node-parameter'].field_name_parameter = `
        <text
            class="node-name-parameter"
            data-width="${widthTextParameter}"
            data-text-overflow="multiline"
            x="40"
            y="${positionTexticonsParameter}"
            fill="#777"
        >
            {val}
        </text>
    `;

    // Template node-parameter (herda de base, mas pode herdar de ana para consistência)
    OrgChart.templates['node-parameter-critical'] = Object.assign({}, OrgChart.templates.base);
    OrgChart.templates['node-parameter-critical'].size = [widthParameter, 0];
    OrgChart.templates['node-parameter-critical'].node = `
        <rect x="0" y="0" width="{w}" height="{h}" fill="#fff" rx="10" ry="10" stroke-width="1px" stroke="#ccc"></rect>
        {field_name_parameter_critical}

        <foreignObject x="7" y="9" width="32" height="32">
            <div xmlns="http://www.w3.org/1999/xhtml">
                <div class="btn-icon-node btn-parameter" data-node-id="{id}" data-btn-popup="parameter" data-tooltip="Show PI's">
                    <i class="fa fa-table"></i>
                </div>
            </div>
        </foreignObject>

        <foreignObject x="35" y="6" width="20" height="20">
            <div xmlns="http://www.w3.org/1999/xhtml">
                <div class="icon-critical" data-node-id="{id}" data-tooltip="Existing Critical PI">
                    <i class="fa fa-exclamation-triangle"></i>
                </div>
            </div>
        </foreignObject>

        <foreignObject x="${positionXiconsParameter}" y="${positionYiconsParameter}" width="${widthContentNodes}" height="32">
            <div xmlns="http://www.w3.org/1999/xhtml" class="btn-group-node">
                <div class="btn-icon-node" data-node-id="{id}" data-btn-popup="create" data-tooltip="{createTooltip}">
                    <i class="fa fa-sitemap icon-rotate"></i>
                </div>
                <div class="btn-icon-node" data-node-id="{id}" data-btn-popup="edit" data-tooltip="{editTooltip}">
                    <i class="fa fa-pencil-square-o"></i>
                </div>
                <div class="btn-icon-node" data-node-id="{id}" data-btn-alert="del" data-tooltip="{delTooltip}">
                    <i class="fa fa-trash-o"></i>
                </div>
            </div>
        </foreignObject>
    `;

    OrgChart.templates['node-parameter-critical'].field_name_parameter_critical = `
        <text
            class="node-name-parameter"
            data-width="${widthTextParameterCritical}"
            data-text-overflow="multiline"
            x="60"
            y="${positionTexticonsParameterCritical}"
            fill="#777"
        >
            {val}
        </text>
    `;
    // -----------------------------------------------------------------------------------------------


    // Função para carregar configurações dos popups
    let magnificIframeConfigs = {};

    async function loadPopupConfigs() {
        try {
            const configsResponse = await fetch('./assets/data-popups-config.json');
            magnificIframeConfigs = await configsResponse.json();
            initializeChart();
        } catch (error) {
            console.error('Erro ao carregar configurações dos popups:', error);
            initializeChart();
        }
    }

    // Função para calcular altura dinâmica de conteúdo (texto ou HTML)
    function calculateContentHeight(content, width, fontSize = 11, lineHeight = 1.5) {
        if (!content || content.trim() === '') return 0;

        // Cria um div temporário para medir o conteúdo
        const $tempDiv = $('<div>').css({
            position: 'absolute',
            visibility: 'hidden',
            width: width + 'px',
            fontSize: fontSize + 'px',
            lineHeight: lineHeight,
            padding: '2px 0',
            margin: '0',
            boxSizing: 'border-box',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            fontFamily: 'Roboto, Arial, sans-serif' // Use a mesma fonte do seu site
        }).html(content);

        $('body').append($tempDiv);
        const height = Math.ceil($tempDiv.outerHeight(true));
        $tempDiv.remove();

        return Math.max(height, 20); // Mínimo de 20px
    }

    // Função para inicializar o chart
    function initializeChart() {
        // Configuração do OrgChart
        window.chart = new OrgChart($("#tree")[0], {
            padding: 80,

            template: "ana",
            orientation: OrgChart.orientation.left_top,
            align: OrgChart.align.orientation,

            enablePan: false,
            enableZoom: false,

            // Configurações de layout e posicionamento
            levelSeparation: 40,
            siblingSeparation: 20,
            subtreeSeparation: 20,

            mouseScrool: OrgChart.action.none,
            nodeMouseClick: OrgChart.action.none,
            enableSearch: false,
            enableDragDrop: false,
            keyNavigation: false,

            showXScroll: true,
            showYScroll: true,

            scaleMin: scaleValue,
            scaleMax: scaleValue,

            //scaleInitial: OrgChart.match.boundary, // dimensiona automaticamente o gráfico para que ele não ultrapasse os limites horizontais e verticais
            //scaleInitial: OrgChart.match.boundaryIfOutside, //reduzirá automaticamente o zoom para que não ultrapasse os limites da área horizontal e vertical

            scaleInitial: OrgChart.match.width, //dimensionar automaticamente o gráfico para que todos os nós fiquem visíveis horizontalmente
            scaleInitial: OrgChart.match.height, //dimensionar automaticamente o gráfico para que todos os nós fiquem visíveis verticalmente,

            // Configuração para templates baseados em tags
            tags: {
                "node-parameter": {
                    template: "node-parameter"
                },
                "node-parameter-critical": {
                    template: "node-parameter-critical"
                }
            },

            nodeBinding: {
                field_name: "name",
                field_html_content: "htmlContent",
                field_name_parameter: "name",
                field_name_parameter_critical: "name",
            },
        });

        // Evento para calcular altura dinamicamente para cada nó
        chart.on('node-initialized', function(sender, args) {
            const data = chart.get(args.node.id);

            if (data.tags && $.inArray('node-parameter', data.tags) !== -1) {
                args.node.h = 40;
            } else if (data.tags && $.inArray('node-parameter-critical', data.tags) !== -1) {
                args.node.h = 40;
            } else {
                // Cálculo para template ANA
                const nameFieldY = 55;
                const buttonAreaHeight = 32;
                const buttonAreaY = 5;
                
                // Medir altura do nome
                let nameHeight = data.name ? calculateContentHeight(data.name, widthContentNodes, 12) : 0;
                
                // Posição onde o HTML deve começar (abaixo do nome)
                let htmlContentY = nameFieldY + nameHeight + 5;
                
                // Medir altura do conteúdo HTML
                let htmlContentHeight = 0;
                if (data.htmlContent && data.htmlContent.trim() !== '') {
                    htmlContentHeight = calculateContentHeight(data.htmlContent, widthContentNodes, 11);
                }

                // Altura total: Fim do conteúdo HTML + margem inferior (padding)
                let totalHeight = htmlContentY + htmlContentHeight + padding;
                
                // Garante altura mínima para os botões
                if (totalHeight < 90) totalHeight = 90;

                // ATUALIZA O NÓ
                args.node.h = totalHeight + 10;
                
                // GUARDA NO DATA (para o evento field ler depois)
                data._htmlContentHeight = htmlContentHeight;
                data._htmlContentY = htmlContentY;
                
                console.log(`Node ${data.id}: h=${totalHeight}, htmlY=${htmlContentY}`);
            }
        });


        // Evento onField para definir y e height do foreignObject dinamicamente
        chart.on('field', function(sender, args) {
            if (args.name === 'field_html_content') {
                const foreignObjectElement = args.element;
                // IMPORTANTE: Buscar os dados do objeto de dados (sender.get), não do args.node
                const nodeData = sender.get(args.node.id);

                const yPos = nodeData._htmlContentY;
                const heightVal = nodeData._htmlContentHeight;

                if (foreignObjectElement && yPos !== undefined && heightVal !== undefined) {
                    foreignObjectElement.setAttribute('y', yPos);
                    foreignObjectElement.setAttribute('height', heightVal);
                }
            }
        });
   
        // Evento de clique
        chart.on('click', function(sender, args) {
            const e = args.event;

            // Evento popup create
            if (args && args.node && e && e.target && $(e.target).closest('[data-btn-popup="create"]').length) {
                const nodeId = args.node.id;
                const nodeData = chart.get(nodeId);
                const nodeLevel = args.node.level;

                if (nodeData && nodeData.urlCreate) {
                const configForLevel = magnificIframeConfigs[nodeLevel];

                if (configForLevel) {
                        $.magnificPopup.open({
                            items: {
                                src: nodeData.urlCreate,
                                type: "iframe",
                            },
                        iframe: {
                            markup: configForLevel.markup,
                        },
                        mainClass: "mfp-fade",
                            removalDelay: 160,
                            preloader: false,
                            fixedContentPos: true,
                        });
                    }
                }
                
                e.stopPropagation();
                return false;
            }

            // Evento popup edit
            if (args && args.node && e && e.target && $(e.target).closest('[data-btn-popup="edit"]').length) {
                const nodeId = args.node.id;
                const nodeData = chart.get(nodeId);
                const nodeLevel = args.node.level;

                if (nodeData && nodeData.urlEdit) {
                    const configForLevel = magnificIframeConfigs[nodeLevel];

                    if (configForLevel) {
                        $.magnificPopup.open({
                            items: {
                                src: nodeData.urlEdit,
                                type: "iframe",
                            },
                            iframe: {
                                markup: configForLevel.markup,
                            },
                            mainClass: "mfp-fade",
                            removalDelay: 160,
                            preloader: false,
                            fixedContentPos: true,
                        });
                    }
                }
                e.stopPropagation();
                return false;
            }

            // Evento para o botão de deletar
            if (args && args.node && e && e.target && $(e.target).closest('[data-btn-alert="del"]').length) {
                const nodeId = args.node.id;
                const nodeData = chart.get(nodeId);

                if (nodeData && confirm(`Deseja excluir o nó "${nodeData.name}"?`)) {
                    if (nodeData.urlDel) {
                        $.ajax({
                                url: nodeData.urlDel,
                                type: 'POST',
                                data: {
                                nodeId: nodeId,
                                action: 'delete'
                            },
                            success: function(response) {
                                //console.log('Nó excluído:', nodeId);
                                chart.removeNode(nodeId);
                                alert('Excluído com sucesso!');
                                window.parent.location.href = '?id_kpi=60&type_control=view';
                            },
                            error: function(xhr, status, error) {
                                //console.error('Erro:', error);
                                alert('Erro ao excluir');
                            }
                        });
                    }
                } else {
                    e.stopPropagation();
                    return false;
                }
            }       
                
            // Evento popup parameter
            if (args && args.node && e && e.target && $(e.target).closest('[data-btn-popup="parameter"]').length) {
                const nodeId = args.node.id;
                const nodeData = chart.get(nodeId);

                if (nodeData && nodeData.urlParameter) {
                    // Use a chave "parameter" diretamente em vez de nodeLevel
                    const configForParameter = magnificIframeConfigs["parameter"];

                    if (configForParameter) {
                        $.magnificPopup.open({
                            items: {
                                src: nodeData.urlParameter,
                                type: 'iframe'
                            },
                            iframe: {
                                markup: configForParameter.markup
                            },
                            mainClass: 'mfp-fade',
                            removalDelay: 160,
                            preloader: false,
                            fixedContentPos: true
                        });
                    } else {
                        console.warn('Configuração "parameter" não encontrada em magnificIframeConfigs');
                    }
                }
                e.stopPropagation();
                return false;
            }
                
            // Evento popup indicator
            if (args && args.node && e && e.target && $(e.target).closest('[data-btn-popup="indicator"]').length) {
                const nodeId = args.node.id;
                const nodeData = chart.get(nodeId);

                if (nodeData && nodeData.urlIndicator) { 
                    // SALVE O ID DO NÓ ATUAL EM UMA VARIÁVEL GLOBAL
                    window.nodeAtivoId = args.node.id;

                    const configForIndicator = magnificIframeConfigs["indicator"];

                    if (configForIndicator) {
                        $.magnificPopup.open({
                            items: {
                                src: nodeData.urlIndicator,
                                type: "iframe",
                            },
                            iframe: {
                                markup: configForIndicator.markup,
                            },
                            mainClass: "mfp-fade",
                            removalDelay: 160,
                            preloader: false,
                            fixedContentPos: true,
                        });
                    } else {
                        console.warn('Configuração "indicator" não encontrada no JSON');
                    }
                }
                e.stopPropagation();
                return false;
            }
        });
            
        // Evento para ajustar alturas após criação
        chart.on('created', function(sender) {
            setTimeout(() => {
                chart.fit();
            }, 100);
        });

        // Evento para desenhar bordas de nível
        chart.on('prerender', function(sender, args){
            const borders = args.res.bordersByRootIdAndLevel[Object.keys(args.res.bordersByRootIdAndLevel)[0]];
            let maxY = Number.MIN_SAFE_INTEGER;
            let minY = Number.MAX_SAFE_INTEGER;
            let minX = Number.MAX_SAFE_INTEGER;
            let maxX = Number.MIN_SAFE_INTEGER;

            for (let i in borders){
                maxY = Math.max(maxY, borders[i].maxY);
                minY = Math.min(minY, borders[i].minY);
                minX = Math.min(minX, borders[i].minX);
                maxX = Math.max(maxX, borders[i].maxX);
            }

            // Barra superior
            const totalWidth = maxX - minX + (padding * 2);
            const barHeight = 30;

            args.content +=
            `<rect x="${minX - padding}" y="${minY - 75}" width="${totalWidth}" height="${barHeight}" fill="#000" rx="10" ry="10" />` +
            `<text class="level-name" x="${minX + totalWidth/2 - padding}" y="${minY - 55}" text-anchor="middle" font-size="16" fill="#fff">${titleKPI}</text>`;

            for (let i in borders){
                const x = borders[i].minX - padding;
                const width = borders[i].maxX - borders[i].minX + padding * 2;
                const height = maxY - minY + padding * 2;
                const y = minY - padding;

                const levelName = customLevelNames[i] || `Nível ${i}`;

                args.content +=
                `<rect x="${x}" y="${minY - 40}" width="${width}" height="24" fill="#fdc643" rx="10" ry="10" />` +
                `<text class="level-name" x="${x + width / 2}" y="${minY - 23}" text-anchor="middle">${levelName}</text>` +
                `<rect style="opacity: 0.7" x="${x}" rx="20" ry="20" y="${y}" width="${width}" height="${height}" fill="${bg_colors[i] || '#ccc'}" />`;
            }
        });

        // Evento redraw para definir os tooltips dinamicamente e inicializar o Tooltipster
        chart.on('redraw', function (sender) {
            // Destruir tooltips existentes em todos os elementos que possam ter tido um tooltip
            $(sender.element).find('.tooltipstered').tooltipster('destroy');

            let totalTooltipElementsFound = 0;

            sender.visibleNodeIds.forEach(nodeId => {
                const nodeElement = sender.getNodeElement(nodeId); // Obtém o elemento <g> SVG do nó
                const nodeData = sender.get(nodeId); // Obtém os dados do nó
                const node = sender.getNode(nodeId);

                if (!nodeElement || !nodeData || !node) return;

                // LEVEL Removidos o botão indicator
                if (node.level === LEVEL_PLANT || node.level === LEVEL_EQUIPMENT || node.level === LEVEL_INDICATOR) {
                    // remove botão indicator
                    $(nodeElement)
                        .find('[data-btn-popup="indicator"]')
                        .remove();
                }

                if (nodeElement && nodeData) {
                    // Define os tooltips para o template 'ana'
                    if (!nodeData.tags || (nodeData.tags && !nodeData.tags.includes('node-parameter') && !nodeData.tags.includes('node-parameter-critical'))) {
                        $(nodeElement).find('[data-btn-popup="create"]').attr('data-tooltip', nodeData.createTooltip || '');
                        $(nodeElement).find('[data-btn-popup="edit"]').attr('data-tooltip', nodeData.editTooltip || '');
                        $(nodeElement).find('[data-btn-alert="del"]').attr('data-tooltip', nodeData.delTooltip || '');
                        $(nodeElement).find('[data-btn-popup="indicator"]').attr('data-tooltip', nodeData.indicatorTooltip || '');
                    }
                    // Define os tooltips para o template 'node-parameter'
                    else if (nodeData.tags && nodeData.tags.includes('node-parameter')) {
                        //$(nodeElement).find('[data-btn-popup="parameter"]').attr('data-tooltip', nodeData.parameterTooltip || '');
                        $(nodeElement).find('[data-btn-popup="create"]').attr('data-tooltip', nodeData.createTooltip || '');
                        $(nodeElement).find('[data-btn-popup="edit"]').attr('data-tooltip', nodeData.editTooltip || '');
                        $(nodeElement).find('[data-btn-alert="del"]').attr('data-tooltip', nodeData.delTooltip || '');
                    }
                    // Define os tooltips para o template 'node-parameter-critical'
                    else if (nodeData.tags && nodeData.tags.includes('node-parameter-critical')) {
                        //$(nodeElement).find('[data-btn-popup="parameter"]').attr('data-tooltip', nodeData.parameterTooltip || '');
                        //$(nodeElement).find('.icon-critical[data-tooltip]').attr('data-tooltip', nodeData.criticalTooltip || '');
                        $(nodeElement).find('[data-btn-popup="create"]').attr('data-tooltip', nodeData.createTooltip || '');
                        $(nodeElement).find('[data-btn-popup="edit"]').attr('data-tooltip', nodeData.editTooltip || '');
                        $(nodeElement).find('[data-btn-alert="del"]').attr('data-tooltip', nodeData.delTooltip || '');
                    }

                    // inicializa Tooltipster para todos os elementos com data-tooltip
                    $(nodeElement).find('[data-tooltip]').each(function() {
                        const $this = $(this);
                        const tooltipContent = $this.attr('data-tooltip'); 

                        if (tooltipContent && tooltipContent.trim() !== '') {
                            $this.tooltipster({
                                content: tooltipContent,
                                interactive: true,
                                trigger: 'hover',
                                delay: 100,
                                side: 'top',
                                debug: true
                            });
                            totalTooltipElementsFound++;
                        } else {
                            console.log('Tooltip content is empty for element:', $this);
                        }
                    });
                }
            });
        });

        chart.load(nodesData);
    }

    loadPopupConfigs();
});

window.adicionarIndicadorAoNode = function(nomeIndicador) {
    const id = window.nodeAtivoId;
    
    if (id && window.chart) {
        const nodeData = window.chart.get(id);

        // Recupera o conteúdo anterior
        let conteudoAtual = nodeData.htmlContent || "";
        
        // Adiciona o novo item (com um <br> ou <div> para quebrar linha)
        const novoItemHtml = `<div>• ${nomeIndicador}</div>`;
        
        // Atualiza o objeto de dados
        nodeData.htmlContent = conteudoAtual + novoItemHtml;
        
        // Aplica a atualização e força o redesenho completo das formas (rect, foreignObject, etc)
        window.chart.updateNode(nodeData);
        window.chart.draw(); 
        
        console.log("Indicador adicionado. Conteúdo atual:", nodeData.htmlContent);
    }
};
