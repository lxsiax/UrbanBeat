<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Factura #{{ $compra->id }} — UrbanBeat</title>
    <style>
          
        @page {
            margin: 0px;
        }
        body { 
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
            color: #000000; 
            margin: 0; 
            padding: 40px; 
            background-color: #ffffff;
            font-size: 13px;
            line-height: 1.4;
        }
        
          
        .header-container {
            border: 3px solid #000000;
            background: #ffffff;
            padding: 25px;
            margin-bottom: 35px;
            box-shadow: 6px 6px 0px 0px #000000;
        }
        .logo { 
            font-size: 32px; 
            font-weight: 900; 
            text-transform: uppercase; 
            letter-spacing: -1px;
            float: left;
            margin: 0;
            padding: 0;
        }
        .logo-color { 
            color: #ec4899;   
        } 
        .info-factura { 
            float: right; 
            text-align: right; 
            font-weight: bold; 
            text-transform: uppercase; 
            font-size: 11px; 
            letter-spacing: 0.5px;
            line-height: 1.6;
        }
        .clear {
            clear: both;
        }

          
        .detalles-bloque { 
            margin-bottom: 35px; 
            width: 100%;
        }
        .col { 
            width: 45%; 
            float: left; 
            border: 2px solid #000000;
            padding: 15px;
            background: #ffffff;
            box-shadow: 4px 4px 0px 0px #000000;
            min-height: 90px;
        }
        .col-right { 
            width: 45%; 
            float: right; 
            border: 2px solid #000000;
            padding: 15px;
            background: #ffffff;
            box-shadow: 4px 4px 0px 0px #000000;
            min-height: 90px;
        }
        .titulo-seccion { 
            font-weight: 900; 
            text-transform: uppercase; 
            font-size: 11px; 
            color: #000000; 
            background: #ec4899;
            color: #ffffff;
            display: inline-block;
            padding: 2px 6px;
            margin-bottom: 10px;
            border: 1px solid #000000;
            letter-spacing: 1px; 
        }
        .datos-texto {
            font-size: 12px;
            color: #333333;
        }

          
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 15px; 
            border: 2px solid #000000;
            box-shadow: 5px 5px 0px 0px #000000;
            margin-bottom: 30px;
        }
        th { 
            background: #000000; 
            color: #ffffff; 
            text-transform: uppercase; 
            font-size: 11px; 
            font-weight: 900; 
            padding: 12px 15px; 
            text-align: left; 
            letter-spacing: 1px; 
            border-bottom: 2px solid #000000;
        }
        td { 
            padding: 14px 15px; 
            border-bottom: 2px solid #000000; 
            vertical-align: middle;
            background: #ffffff;
            font-size: 12px;
        }
        tr:last-child td {
            border-bottom: none;
        }
        .item-detalle {
            font-size: 11px;
            color: #666666;
            margin-top: 3px;
            text-transform: uppercase;
            font-weight: bold;
        }

          
        .total-wrapper {
            width: 100%;
            margin-top: 10px;
        }
        .total-container { 
            float: right; 
            width: 35%; 
            border: 2px solid #000000;
            background: #ffffff;
            padding: 15px;
            text-align: right; 
            box-shadow: 4px 4px 0px 0px #ec4899;
            margin-bottom: 35px;
        }
        .total-label { 
            font-weight: 900; 
            text-transform: uppercase; 
            font-size: 11px;
            letter-spacing: 1px;
            color: #666666;
        }
        .total-precio { 
            font-size: 26px; 
            font-weight: 900; 
            color: #000000; 
            italic: font-style;
        }

          
        .asistentes-box { 
            border: 2px dashed #000000; 
            padding: 20px; 
            background: #fffdf5;   
            margin-top: 20px;
            page-break-inside: avoid;   
        }
        .asistente-grid {
            margin-top: 10px;
        }
        .asistente-item { 
            padding: 10px 0;
            border-bottom: 1px solid #dddddd; 
            font-size: 12px; 
        }
        .asistente-item:last-child {
            border-bottom: none;
        }
        .badge-asistente {
            background: #000000;
            color: #ffffff;
            font-size: 10px;
            font-weight: 900;
            padding: 2px 6px;
            text-transform: uppercase;
            margin-right: 5px;
        }

          
        .footer-nota { 
            text-align: center; 
            margin-top: 50px; 
            font-size: 9px; 
            color: #777777; 
            text-transform: uppercase; 
            font-weight: bold; 
            letter-spacing: 1px;
            line-height: 1.5;
        }
    </style>
</head>
<body>

    <div class="header-container">
        <div class="logo">URBAN<span class="logo-color">BEAT</span></div>
        <div class="info-factura">
            REF: #UB-{{ str_pad($compra->id, 5, '0', STR_PAD_LEFT) }}<br>
            EMISIÓN: {{ $compra->created_at->format('d/m/Y H:i') }}<br>
            ESTADO: <span style="color: #ec4899;"> {{ strtoupper($compra->estado) }}</span>
        </div>
        <div class="clear"></div>
    </div>

    <div class="detalles-bloque">
        <div class="col">
            <div class="titulo-seccion">Organizador</div>
            <div class="datos-texto">
                <strong>UrbanBeat Festival S.L.</strong><br>
                CIF: B-99999999<br>
                Av. de las Piletas, 13, 11540 Sanlúcar de Barrameda<br>
                info@urbanbeatfestival.com
            </div>
        </div>
        <div class="col-right">
            <div class="titulo-seccion">Cliente</div>
            <div class="datos-texto">
                <strong>{{ $compra->user->name ?? 'Asistente Registrado' }}{{ $compra->user->apellidos ?? 'e' }}</strong><br>
                Email: {{ $compra->user->email ?? '-' }}<br>
                DNI/NIE: {{ $compra->user->dni ?? 'No especificado' }}<br>
                ID Cliente: #URBAN-{{ str_pad($compra->user_id, 4, '0', STR_PAD_LEFT) }}
            </div>
        </div>
        <div class="clear"></div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Detalle del Artículo</th>
                <th style="text-align: center; width: 12%;">Cantidad</th>
                <th style="text-align: right; width: 20%;">Precio Unit.</th>
                <th style="text-align: right; width: 20%;">Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($compra->facturas as $linea)
            <tr>
                <td>
                    @if($linea->entrada)
                        <strong style="text-transform: uppercase;">Entrada Nom. — {{ $linea->entrada->nombre ?? 'Abono General' }}</strong>
                        <div class="item-detalle">Acceso oficial al recinto del festival</div>
                    @elseif($linea->producto)
                        <strong style="text-transform: uppercase;">Merchandising — {{ $linea->producto->nombre ?? 'Artículo' }}</strong>
                        @if($linea->talla) 
                            <div class="item-detalle">Talla seleccionada: {{ $linea->talla->nombre }}</div> 
                        @endif
                    @else
                        <strong>Artículo General UrbanBeat</strong>
                    @endif
                </td>
                <td style="text-align: center; font-weight: bold;">×{{ $linea->cantidad }}</td>
                <td style="text-align: right;">{{ number_format($linea->precio_unitario, 2) }}€</td>
                <td style="text-align: right; font-weight: bold;">{{ number_format($linea->precio_unitario * $linea->cantidad, 2) }}€</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="total-wrapper">
        <div class="total-container">
            <span class="total-label">Importe Total</span><br>
            <span class="total-precio">{{ number_format($compra->total, 2) }}€</span>
        </div>
        <div class="clear"></div>
    </div>

    @if($compra->asistentes->count() > 0)
    <div class="asistentes-box">
        <div class="titulo-seccion" style="background: #000000;">Accesos Vinculados</div>
        <p style="font-size: 11px; margin: 5px 0 15px 0; font-weight: bold; text-transform: uppercase; color: #555555;">
            Las siguientes entradas son personales e intransferibles. Se requerirá documento de identidad físico en los accesos.
        </p>
        
        <div class="asistente-grid">
            @foreach($compra->asistentes as $index => $asistente)
                <div class="asistente-item">
                    <span class="badge-asistente">TICKET {{ str_pad($index + 1, 2, '0', STR_PAD_LEFT) }}</span>
                    <strong>{{ strtoupper($asistente->nombre) }}</strong> 
                    <span style="color: #666666; margin: 0 5px;">|</span> 
                    <strong>DNI:</strong> {{ strtoupper($asistente->dni) }} 
                    <span style="color: #666666; margin: 0 5px;">|</span> 
                    <strong>TÉLF:</strong> {{ $asistente->numero }} 
                    <span style="color: #666666; margin: 0 5px;">|</span> 
                    <strong>EMAIL:</strong> {{ $asistente->email }}
                </div>
            @endforeach
        </div>
    </div>
    @endif

    <div class="footer-nota">
        UrbanBeat Festival • Este documento sirve como justificante de pago y asignación de derechos de acceso.<br>
        ¡Gracias por tu confianza! Nos vemos en UrbanBeat.
    </div>

</body>
</html>