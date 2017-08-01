# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_auto_20170730_1003'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='bag_num',
            field=models.CharField(max_length=40, null=True),
            preserve_default=True,
        ),
    ]
