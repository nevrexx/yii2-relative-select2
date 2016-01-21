Yii2 Relative Select2 Widget
============================
Relative Select2 Widget for Yii2 Framework. It allows to obtain dynamically data via AJAX depending on the parent attribute. Widget extends and requires kartik-v Select2 Widget (https://github.com/kartik-v/yii2-widget-select2).

Installation
------------

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
php composer.phar require --prefer-dist platx/yii2-relative-select2 "*"
```

or add

```
"platx/yii2-relative-select2": "*"
```

to the require section of your `composer.json` file.


Usage
-----

Usage with ActiveForm and model
```php
<?= \$form->field($model, 'state_1')->widget(\platx\relativeselect2\RelativeSelect2::classname(), [
     'parentName' => 'parent_attribute_name',
     'url' => Url::to(['/ajax/list-items']),
     'options' => ['placeholder' => 'Select a state ...'],
     'pluginOptions' => [
         'allowClear' => true
     ],
]) ?>
```

With a model and without ActiveForm
```php
<?= \platx\relativeselect2\RelativeSelect2::widget([
     'model' => $model,
     'attribute' => 'state_2',
     'parentName' => 'parent_attribute_name',
     'url' => Url::to(['/ajax/list-items']),
     'options' => ['placeholder' => 'Select a state ...'],
     'pluginOptions' => [
         'allowClear' => true
     ],
]) ?>
```

Without model and implementing a multiple select
```php
<?= \platx\relativeselect2\RelativeSelect2::widget([
     'name' => 'state_2',
     'parentName' => 'parent_attribute_name',
     'url' => Url::to(['/ajax/list-items']),
     'options' => ['placeholder' => 'Select a state ...'],
     'pluginOptions' => [
         'allowClear' => true,
         'multiple' => true
     ],
]) ?>
```

Controller example for data obtaining
```php
<?php
class AjaxController extends \yii\web\Controller
{
    public function actionListItems($query = null)
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $out = ['results' => ['id' => '', 'text' => '']];
        if (!is_null($query)) {
            $models = Model::find()
                ->andWhere(['parent_id' => $query])
                ->all();
            $items = [];
            foreach($models as $model) {
                $items[] = ['id' => $model->id, 'text' => $model->name];
            }
            if(!empty($items)) {
                $out['results'] = $items;
            }
        }
        return $out;
    }
}
```