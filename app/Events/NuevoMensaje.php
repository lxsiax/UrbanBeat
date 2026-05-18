<?php

namespace App\Events;

use App\Models\Mensaje;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NuevoMensaje implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $mensaje;

    public function __construct(Mensaje $mensaje)
    {
        $this->mensaje = $mensaje->load('user:id,name,apellidos');
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('chat.' . $this->mensaje->chat_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'mensaje.enviado';
    }
}