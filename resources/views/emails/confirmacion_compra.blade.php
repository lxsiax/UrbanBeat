<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Compra — UrbanBeat</title>
</head>
<body style="margin: 0; padding: 0; background-color: #fcfcfc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #000000; -webkit-font-smoothing: antialiased;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fcfcfc; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="100%" max-width="600px" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 2px solid #000000; border-radius: 24px; box-shadow: 8px 8px 0px 0px #000000; overflow: hidden;">
                    
                    <tr>
                        <td style="background-color: #000000; padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; font-style: italic;">
                                UrbanBeat <span style="color: #ec4899;">Festival</span>
                            </h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 15px 0; font-size: 22px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px;">
                                ¡Hola, {{ $compra->user->name ?? 'Fiel Seguidor' }}! 🎉
                            </h2>
                            <p style="margin: 0 0 25px 0; font-size: 15px; line-height: 1.6; color: #4b5563;">
                                Tu pago se ha procesado con éxito en nuestra plataforma segura. ¡Oficialmente ya tienes tu pase listo para la experiencia UrbanBeat! A continuación, puedes ver un resumen de lo adquirido.
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px; border-collapse: collapse;">
                                <thead>
                                    <tr style="border-bottom: 2px solid #000000;">
                                        <th align="left" style="padding: 10px 0; font-size: 12px; font-weight: 900; text-transform: uppercase; color: #6b7280;">Concepto</th>
                                        <th align="center" style="padding: 10px 0; font-size: 12px; font-weight: 900; text-transform: uppercase; color: #6b7280; width: 80px;">Cant.</th>
                                        <th align="right" style="padding: 10px 0; font-size: 12px; font-weight: 900; text-transform: uppercase; color: #6b7280; width: 100px;">Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($compra->facturas as $linea)
                                        <tr style="border-bottom: 1px solid #e5e7eb;">
                                            <td style="padding: 15px 0; font-size: 14px; font-weight: bold;">
                                                @if($linea->entrada)
                                                    Entrada: {{ $linea->entrada->tipoEntrada->nombre ?? 'Pase Festival' }}
                                                @elseif($linea->producto)
                                                    Merch: {{ $linea->producto->nombre }}
                                                @else
                                                    Artículo General
                                                @endif
                                            </td>
                                            <td align="center" style="padding: 15px 0; font-size: 14px; color: #4b5563;">
                                                {{ $linea->cantidad }}
                                            </td>
                                            <td align="right" style="padding: 15px 0; font-size: 14px; font-weight: bold;">
                                                {{ number_format($linea->precio_unitario * $linea->cantidad, 2) }}€
                                            </td>
                                        </tr>
                                    @endforeach
                                    <tr>
                                        <td colspan="2" align="right" style="padding: 20px 0 0 0; font-size: 14px; font-weight: 900; text-transform: uppercase;">Total Pagado:</td>
                                        <td align="right" style="padding: 20px 0 0 0; font-size: 18px; font-weight: 900; color: #ec4899;">{{ number_format($compra->total, 2) }}€</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div style="background-color: #f3f4f6; border-left: 4px solid #000000; padding: 15px; border-radius: 8px; margin-bottom: 30px;">
                                <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #1f2937; font-weight: bold;">
                                    📎 Hemos adjuntado a este correo electrónico tu factura oficial en formato PDF. Contiene los datos de tus entradas nominativas para acceder al recinto del festival.
                                </p>
                            </div>

                            <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #4b5563;">
                                Si tienes alguna duda con tu pedido, responde directamente a este email y nuestro equipo de soporte te ayudará encantado.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 5px 0; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #9ca3af;">
                                © {{ date('Y') }} UrbanBeat Festival S.L.
                            </p>
                            <p style="margin: 0; font-size: 11px; color: #9ca3af;">
                                Has recibido este correo electrónico porque realizaste un pedido en nuestra web oficial.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>