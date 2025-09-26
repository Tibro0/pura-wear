<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::orderBy('id', 'DESC')->get();

        return response()->json([
            'data' => $orders,
            'status' => 200,
        ], 200);
    }

    public function detail(string $id)
    {
        $order = Order::with('items')->find($id);

        if ($order == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Order Not Found!',
                'data' => []
            ], 404);
        }

        return response()->json([
            'data' => $order,
            'status' => 200,
        ], 200);
    }
}
