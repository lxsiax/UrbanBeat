<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $usuarios = User::select('id', 'name', 'apellidos', 'email', 'role_id', 'baneado', 'acceso_permitido', 'created_at')
            ->get();

        return Inertia::render('Admin/Usuarios/Index', [
            'usuarios' => $usuarios
        ]);
    }

    public function alternarAcceso($id)
    {
        $usuario = User::findOrFail($id);

        $usuario->update([
            'acceso_permitido' => !$usuario->acceso_permitido
        ]);

        return redirect()->back();
    }

    public function updateRole(Request $request, User $usuario)
    {
        $request->validate([
            'role_id' => 'required|integer'
        ]);

        $usuario->update([
            'role_id' => $request->role_id
        ]);

        return back()->with('success', 'Rol de usuario actualizado.');
    }

    public function destroy(User $usuario)
    {
        if ($usuario->id === auth()->id()) {
            return back()->withErrors(['error' => 'No puedes eliminar tu propia cuenta de administrador.']);
        }

        $usuario->delete();

        return back()->with('success', 'Usuario eliminado correctamente.');
    }
}