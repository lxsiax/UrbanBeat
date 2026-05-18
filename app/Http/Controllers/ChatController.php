<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Mensaje;
use App\Models\User;
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
                $query->select('id', 'name', 'apellidos', 'role_id', 'baneado');
            }
        ]);

        return Inertia::render('Chat', [
            'chat' => $chat,
            'usuarioActualId' => Auth::id(),
            'esAdmin' => Auth::user()->esAdmin()
        ]);
    }

    public function enviarMensaje(Request $request, Chat $chat)
    {
        if (Auth::user()->baneado) {
            return back()->withErrors(['error' => 'Estás baneado de este chat.']);
        }

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

    public function banearUsuario(User $user)
    {
        if (!Auth::user()->esAdmin()) {
            abort(403);
        }

        if ($user->role_id === 1) {
            return back();
        }

        $user->update([
            'baneado' => !$user->baneado
        ]);

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