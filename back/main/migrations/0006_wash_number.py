# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_auto_20170729_0443'),
    ]

    operations = [
        migrations.AddField(
            model_name='wash',
            name='number',
            field=models.IntegerField(default=1),
            preserve_default=True,
        ),
    ]
