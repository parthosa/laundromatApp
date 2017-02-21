# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Hostel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, null=True)),
                ('short', models.CharField(max_length=4, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Plan',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('plan_num', models.IntegerField(null=True)),
                ('washes', models.IntegerField(null=True)),
                ('with_iron', models.BooleanField(default=False)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, null=True)),
                ('number', models.IntegerField(null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('bits_id', models.CharField(max_length=20, null=True)),
                ('name', models.CharField(max_length=20, null=True)),
                ('room', models.IntegerField(null=True)),
                ('apply_date', models.CharField(max_length=30, null=True)),
                ('phone', models.IntegerField(null=True)),
                ('uid', models.CharField(max_length=60, null=True)),
                ('dp', models.ImageField(null=True, upload_to=b'dps')),
                ('dp_url', models.SlugField(null=True)),
                ('hostel', models.ForeignKey(related_name=b'stu_hostel', to='main.Hostel', null=True)),
                ('plan', models.ForeignKey(related_name=b'stu_plan', to='main.Plan', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Wash',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.CharField(max_length=100, null=True)),
                ('status', models.ForeignKey(related_name=b'status_user', to='main.Status', null=True)),
                ('user', models.ForeignKey(related_name=b'wash_use', to='main.UserProfile', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='present_wash',
            field=models.ForeignKey(related_name=b'stu_wash', to='main.Wash', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='userprofile',
            name='user',
            field=models.ForeignKey(related_name=b'user_p', to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='userprofile',
            name='wash_history',
            field=models.ManyToManyField(related_name=b'stu_wash_history', to='main.Wash'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='hostel',
            name='user',
            field=models.ManyToManyField(related_name=b'hostel_stu', null=True, to='main.UserProfile'),
            preserve_default=True,
        ),
    ]
