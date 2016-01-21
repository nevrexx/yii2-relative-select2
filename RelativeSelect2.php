<?php

namespace platx\relativeselect2;

use yii\base\InvalidParamException;
use yii\base\Model;
use yii\helpers\Html;
use yii\helpers\Url;


/**
 * Class Select2
 * @package backend\widgets
 */
class RelativeSelect2 extends \kartik\select2\Select2
{
    /**
     * @var null|string
     */
    public $parentName = null;

    /**
     * @var null|Model
     */
    public $parentModel = null;

    /**
     * @var null|string
     */
    public $url = null;

    /**
     *
     */
    public function init()
    {
        if (empty($this->parentName)) {
            throw new InvalidParamException('RelativeSelect2 $parentName must be set!');
        }
        if (empty($this->url)) {
            throw new InvalidParamException('RelativeSelect2 $url must be set!');
        }

        if ($this->parentModel instanceof Model) {
            $this->options['data']['select2-parent-name'] = Html::getInputName($this->parentModel, $this->parentName);
        } else {
            $this->options['data']['select2-parent-name'] = $this->hasModel() ? Html::getInputName($this->model, $this->parentName) : $this->parentName;
        }

        if (is_array($this->url)) {
            $this->url = Url::to($this->url);
        }

        $this->options['data']['select2-url'] = $this->url;

        if(!empty($this->model) && isset($this->model->{$this->attribute})) {
            if(isset($this->options['multiple']) && $this->options['multiple'] || is_array($this->model->{$this->attribute})) {
                $this->options['data']['select2-selected-items'] = implode(',', $this->model->{$this->attribute});
            } else {
                $this->options['data']['select2-selected-items'] = $this->model->{$this->attribute};
            }
        } else {
            $this->options['data']['select2-selected-items'] = $this->value;
        }

        parent::init();
        RelativeSelect2Asset::register($this->getView());
    }



}