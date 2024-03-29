<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LifeExpectancyController;
use App\Http\Controllers\FemaleLifeExpectancyInterpolatedController;
use App\Http\Controllers\FemaleDeathProbabilityInterpolatedController;
use App\Http\Controllers\FemaleNumberOfLivesInterpolatedController;
use App\Http\Controllers\MaleLifeExpectancyInterpolatedController;
use App\Http\Controllers\MaleDeathProbabilityInterpolatedController;
use App\Http\Controllers\MaleNumberOfLivesInterpolatedController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/life-expectancies', [LifeExpectancyController::class, 'index']);
Route::get('/female-life-expectancy-interpolated', [FemaleLifeExpectancyInterpolatedController::class, 'index']);
Route::get('/female-death-probability-interpolated', [FemaleDeathProbabilityInterpolatedController::class, 'index']);
Route::get('/female-number-of-lives-interpolated', [FemaleNumberOfLivesInterpolatedController::class, 'index']);
Route::get('/male-life-expectancy-interpolated', [MaleLifeExpectancyInterpolatedController::class, 'index']);
Route::get('/male-death-probability-interpolated', [MaleDeathProbabilityInterpolatedController::class, 'index']);
Route::get('/male-number-of-lives-interpolated', [MaleNumberOfLivesInterpolatedController::class, 'index']);