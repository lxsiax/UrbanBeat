<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Mensaje;
use App\Events\NuevoMensaje; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function show(Chat $chat)
    {
        $chat->load([
            'mensajes.user' => function ($query) {
                $query->select('id', 'name', 'apellidos');
            }
        ]);

        return Inertia::render('Chat', [
            'chat' => $chat,
            'usuarioActualId' => Auth::id()
        ]);
    }

    public function enviarMensaje(Request $request, Chat $chat)
    {
        $request->validate([
            'contenido' => 'required|string|max:1000',
        ]);

        $mensaje = $chat->mensajes()->create([
            'user_id' => Auth::id(),
            'contenido' => $request->contenido,
        ]);

        broadcast(new NuevoMensaje($mensaje))->toOthers();

        return back();
    }

    public function chatGeneral()
    {
        $chat = Chat::firstOrCreate(
            ['nombre' => 'Foro General'],
            ['descripcion' => '¡El espacio oficial de la comunidad UrbanBeat! 📢']
        );

        return redirect()->route('chats.show', $chat->id);
    }
}