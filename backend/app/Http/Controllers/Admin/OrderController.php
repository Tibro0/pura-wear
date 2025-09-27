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
        $order = Order::with('items', 'items.product')->find($id);

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

    public function updateOrder(string $id, Request $request)
    {
        $order = Order::find($id);

        if ($order == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Order Not Found!',
            ], 404);
        }

        $order->status = $request->status;
        $order->payment_status = $request->payment_status;
        $order->save();

        return response()->json([
            'status' => 200,
            'data'=> $order,
            'message' => 'Order Updated Successfully!',
        ], 200);
    }
}
