<?php

namespace platx\relativeselect2;

use yii\web\AssetBundle;


/**
 * Class RelativeSelect2Asset
 * @package backend\widgets
 */
class RelativeSelect2Asset extends AssetBundle
{
    public $js = [
        'relative-select2.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\web\JqueryAsset'
    ];

    public function init()
    {
        $this->sourcePath = __DIR__ . '/assets';
        parent::init();
    }
}