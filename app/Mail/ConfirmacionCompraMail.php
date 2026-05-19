<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Compra;

class ConfirmacionCompraMail extends Mailable
{
    use Queueable, SerializesModels;

    public $compra;
    protected $pdfOutput;

    public function __construct(Compra $compra, $pdfOutput)
    {
        $this->compra = $compra;
        $this->pdfOutput = $pdfOutput;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmación de Compra — UrbanBeat Festival',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.confirmacion_compra',
        );
    }

    public function attachments(): array
    {
        return [
            Attachment::fromData(fn () => $this->pdfOutput, 'Factura_UrbanBeat_#' . $this->compra->id . '.pdf')
                ->withMime('application/pdf'),
        ];
    }
}