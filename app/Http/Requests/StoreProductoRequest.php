<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->role_id == 1;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => 'required|string|min:3|max:255',
            'precio' => 'required|numeric|gt:0',
            'esta_oculto' => 'required|boolean',
            'imagen' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'stocks' => 'required|array',
        ];
    }
}
