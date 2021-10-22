class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  def self.has_many_attached(name, *)
    super

    define_method "#{name}=" do |value|
      super Array(value).compact_blank
    end
  end
end
