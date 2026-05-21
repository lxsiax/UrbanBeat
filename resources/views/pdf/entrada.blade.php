<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ticket #{{ $asistente->id }} — UrbanBeat</title>
    <style>
        @page { margin: 0px; }
        body { 
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
            color: #000000; margin: 0; padding: 40px; background-color: #ffffff;
            font-size: 13px; line-height: 1.4;
        }
        .ticket-card {
            border: 4px solid #000000;
            padding: 30px;
            background: #ffffff;
            box-shadow: 8px 8px 0px 0px #ec4899;
            margin-bottom: 20px;
            position: relative;
        }
        .logo { font-size: 36px; font-weight: 900; text-transform: uppercase; letter-spacing: -1px; margin-bottom: 20px; }
        .logo span { color: #ec4899; }
        
        .badge {
            background: #000000; color: #ffffff; font-weight: 900;
            padding: 5px 10px; text-transform: uppercase; font-size: 14px;
            display: inline-block; margin-bottom: 15px; border: 2px solid #000000;
        }

        .info-section { width: 60%; float: left; }
        .qr-section { width: 35%; float: right; text-align: right; }
        .qr-section img { width: 160px; height: 160px; border: 3px solid #000000; padding: 5px; background: #fff; }
        .clear { clear: both; }

        .dato-linea { margin-bottom: 12px; font-size: 14px; }
        .dato-linea strong { text-transform: uppercase; font-size: 11px; color: #666666; display: block; letter-spacing: 0.5px; }
        .dato-val { font-weight: bold; font-size: 16px; text-transform: uppercase; }

        .condiciones {
            margin-top: 40px; border-top: 2px dashed #000000; padding-top: 20px;
            font-size: 10px; color: #444444; text-transform: uppercase; font-weight: bold; text-align: center;
        }
    </style>
</head>
<body>

    <div class="ticket-card">
        <div class="logo">URBAN<span>BEAT</span></div>
        
        <div class="info-section">
            <div class="badge">Pase Oficial de Acceso</div>
            
            <div class="dato-linea">
                <strong>Tipo de Entrada</strong>
                <div class="dato-val" style="color: #ec4899;">{{ $asistente->entrada->titulo ?? $asistente->entrada->nombre ?? 'ABONO GENERAL' }}</div>
            </div>

            <div class="dato-linea">
                <strong>Asistente / Titular</strong>
                <div class="dato-val">{{ $asistente->nombre }}</div>
            </div>

            <div class="dato-linea">
                <strong>Documento de Identidad</strong>
                <div class="dato-val">DNI/NIE: {{ $asistente->dni }}</div>
            </div>

            <div class="dato-linea">
                <strong>Localizador de Seguridad</strong>
                <div class="dato-val" style="font-family: monospace;">#UB-TKT-{{ str_pad($asistente->id, 6, '0', STR_PAD_LEFT) }}</div>
            </div>
        </div>

        <div class="qr-section">
            <img src="{{ $qrcode }}" alt="Código QR de Acceso">
            <div style="font-size: 9px; font-weight: bold; text-align: center; margin-top: 5px; text-transform: uppercase;">Escanear en puerta</div>
        </div>

        <div class="clear"></div>

        <div class="condiciones">
            Imprescindible presentar este ticket junto al DNI original físico del titular • Prohibida su reventa • El organizador se reserva el derecho de admisión • No se admiten cambios ni devoluciones una vez validado en el control de pulseras.
        </div>
    </div>

</body>
</html>