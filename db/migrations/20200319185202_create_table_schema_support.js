
exports.up = function(knex) {
    return knex.schema
    //schema support
    .createTable('support.genders', function(table){
        table.increments('id_gender')
        table.string('gender')
    })
    .createTable('support.religions', function(table){
        table.increments('id_religion')
        table.string('religion')
    })
    .createTable('support.provinces', function(table){
        table.increments('id_province')
        table.string('province')
    })
    .createTable('support.regencies', function(table){
        table.increments('id_regency')
        table.integer('province_id').unsigned()
        table.string('regency')
        table.foreign('province_id').references('id_province').inTable('support.provinces').onUpdate('cascade').onDelete('cascade')
    })
    .createTable('support.districts', function(table){
        table.increments('id_district')
        table.integer('regency_id').unsigned()
        table.string('district')
        table.foreign('regency_id').references('id_regency').inTable('support.regencies').onUpdate('cascade').onDelete('cascade')
    })
    .createTable('support.villages', function(table){
        table.bigincrements('id_village')
        table.integer('district_id').unsigned()
        table.string('village')
        table.foreign('district_id').references('id_district').inTable('support.districts').onUpdate('cascade').onDelete('cascade')
    })
    .createTable('support.educations', function(table){
        table.increments('id_education')
        table.string('education')
    })
    .createTable('support.schools', function(table){
        table.increments('id_school')
        table.integer('regency_id').unsigned()
        table.string('kecamatan')
        table.string('npsn')
        table.string('sekolah')
        table.string('bentuk')
        table.enum('status', ['N','S'])
        table.text('alamat')
        table.string('bintang')
        table.string('bujur')
        table.foreign('regency_id').references('id_regency').inTable('support.regencies').onUpdate('cascade').onDelete('cascade')
    })
    .createTable('support.pekerjaan', function(table){
        table.increments('id_pekerjaan')
        table.string('pekerjaan', 50)
    })
    .createTable('support.keahlian', function(table){
        table.increments('id_keahlian')
        table.string('keahlian', 50)
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('support.keahlian')
    .dropTable('support.pekerjaan')
    .dropTable('support.genders')
    .dropTable('support.schools')
    .dropTable('support.religions')
    .dropTable('support.villages')
    .dropTable('support.districts')
    .dropTable('support.regencies')
    .dropTable('support.provinces')
    .dropTable('support.educations')
};
